"""
L&R Web Technologies - contact form API (FastAPI).

What it does
------------
* Validates the enquiry sent by the website's contact form.
* Rejects obvious bots (honeypot field, submitted-too-fast check, per-IP rate limit).
* Saves every valid enquiry to a local SQLite database so nothing is lost.
* Sends the enquiry by email (SMTP) to the business inbox(es).
* Returns {"ok": true} ONLY when the email was actually handed to the SMTP server.
  If email delivery fails the API returns an error, so the website never shows a fake success.

All credentials come from environment variables (see .env.example). Nothing secret
lives in the frontend.
"""
from __future__ import annotations

import html
import logging
import os
import re
import smtplib
import sqlite3
import ssl
import time
from collections import defaultdict, deque
from contextlib import closing
from datetime import datetime, timezone
from email.message import EmailMessage
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

try:  # optional: load server/.env when python-dotenv is installed
    from dotenv import load_dotenv

    load_dotenv(Path(__file__).with_name(".env"))
except ImportError:  # pragma: no cover
    pass

log = logging.getLogger("lr-contact")
logging.basicConfig(level=logging.INFO)

# ---- configuration (environment) -------------------------------------------
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "465"))  # 465 = SSL, 587 = STARTTLS
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
MAIL_FROM = os.getenv("MAIL_FROM", SMTP_USER)
# Comma-separated list. Add the second business contact's email here for notifications.
NOTIFY_TO = [e.strip() for e in os.getenv("NOTIFY_TO", "lrwebtechnologies@gmail.com").split(",") if e.strip()]
ALLOWED_ORIGINS = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",") if o.strip()]
DB_PATH = os.getenv("DB_PATH", str(Path(__file__).with_name("enquiries.db")))
RATE_LIMIT = int(os.getenv("RATE_LIMIT_PER_HOUR", "5"))
MIN_FILL_MS = int(os.getenv("MIN_FILL_MS", "3000"))

app = FastAPI(title="L&R Web Technologies API", docs_url=None, redoc_url=None)
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)

# ---- models -----------------------------------------------------------------
EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]{2,}$")


class Enquiry(BaseModel):
    fullName: str = Field(min_length=2, max_length=100)
    email: str = Field(max_length=150)
    whatsapp: str = Field(min_length=8, max_length=25)
    company: str = Field(default="", max_length=120)
    service: str = Field(min_length=1, max_length=120)
    description: str = Field(min_length=20, max_length=4000)
    budget: str = Field(default="", max_length=60)
    contactMethod: str = Field(default="WhatsApp", max_length=30)
    consent: bool
    website: str = Field(default="", max_length=200)  # honeypot
    elapsedMs: int = Field(default=0, ge=0)


# ---- storage ----------------------------------------------------------------
def init_db() -> None:
    with closing(sqlite3.connect(DB_PATH)) as db:
        db.execute(
            """CREATE TABLE IF NOT EXISTS enquiries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                created_at TEXT NOT NULL,
                full_name TEXT, email TEXT, whatsapp TEXT, company TEXT,
                service TEXT, description TEXT, budget TEXT, contact_method TEXT,
                ip TEXT, email_status TEXT NOT NULL DEFAULT 'pending'
            )"""
        )
        db.commit()


def save_enquiry(e: Enquiry, ip: str) -> int:
    with closing(sqlite3.connect(DB_PATH)) as db:
        cur = db.execute(
            """INSERT INTO enquiries
               (created_at, full_name, email, whatsapp, company, service, description, budget, contact_method, ip)
               VALUES (?,?,?,?,?,?,?,?,?,?)""",
            (
                datetime.now(timezone.utc).isoformat(),
                e.fullName.strip(),
                e.email.strip(),
                e.whatsapp.strip(),
                e.company.strip(),
                e.service,
                e.description.strip(),
                e.budget,
                e.contactMethod,
                ip,
            ),
        )
        db.commit()
        return int(cur.lastrowid)


def set_email_status(row_id: int, status: str) -> None:
    with closing(sqlite3.connect(DB_PATH)) as db:
        db.execute("UPDATE enquiries SET email_status=? WHERE id=?", (status, row_id))
        db.commit()


init_db()

# ---- rate limiting (in-memory, per IP) -------------------------------------
_hits: dict[str, deque[float]] = defaultdict(deque)


def rate_limited(ip: str) -> bool:
    now = time.time()
    q = _hits[ip]
    while q and now - q[0] > 3600:
        q.popleft()
    if len(q) >= RATE_LIMIT:
        return True
    q.append(now)
    return False


# ---- email -------------------------------------------------------------------
def build_message(e: Enquiry) -> EmailMessage:
    msg = EmailMessage()
    msg["Subject"] = f"New website enquiry: {e.service} - {e.fullName.strip()}"
    msg["From"] = MAIL_FROM
    msg["To"] = ", ".join(NOTIFY_TO)
    msg["Reply-To"] = e.email.strip()
    rows = [
        ("Name", e.fullName.strip()),
        ("Email", e.email.strip()),
        ("WhatsApp", e.whatsapp.strip()),
        ("Company", e.company.strip() or "-"),
        ("Service", e.service),
        ("Budget", e.budget or "-"),
        ("Preferred contact", e.contactMethod),
    ]
    text = "\n".join(f"{k}: {v}" for k, v in rows) + f"\n\nProject description:\n{e.description.strip()}\n"
    msg.set_content(text)
    table = "".join(f"<tr><td><b>{html.escape(k)}</b></td><td>{html.escape(v)}</td></tr>" for k, v in rows)
    msg.add_alternative(
        f"<h2>New website enquiry</h2><table cellpadding='6'>{table}</table>"
        f"<h3>Project description</h3><p style='white-space:pre-wrap'>{html.escape(e.description.strip())}</p>",
        subtype="html",
    )
    return msg


def send_email(msg: EmailMessage) -> None:
    if not (SMTP_USER and SMTP_PASSWORD):
        raise RuntimeError("SMTP credentials are not configured on the server.")
    ctx = ssl.create_default_context()
    if SMTP_PORT == 465:
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=ctx, timeout=15) as s:
            s.login(SMTP_USER, SMTP_PASSWORD)
            s.send_message(msg)
    else:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as s:
            s.starttls(context=ctx)
            s.login(SMTP_USER, SMTP_PASSWORD)
            s.send_message(msg)


# ---- routes ------------------------------------------------------------------
@app.get("/api/health")
def health() -> dict[str, bool]:
    return {"ok": True}


@app.post("/api/contact")
def contact(enquiry: Enquiry, request: Request) -> dict[str, bool]:
    ip = request.headers.get("x-forwarded-for", request.client.host if request.client else "unknown").split(",")[0].strip()

    if not enquiry.consent:
        raise HTTPException(400, "Please accept the privacy consent to send your enquiry.")
    if not EMAIL_RE.match(enquiry.email.strip()):
        raise HTTPException(400, "Please enter a valid email address.")
    if enquiry.website:  # honeypot filled -> bot. Pretend nothing happened, do not send.
        log.info("Honeypot triggered from %s", ip)
        raise HTTPException(400, "Your enquiry could not be accepted.")
    if enquiry.elapsedMs < MIN_FILL_MS:
        raise HTTPException(400, "That was very quick! Please check your details and try sending again.")
    if rate_limited(ip):
        raise HTTPException(429, "Too many enquiries from your connection. Please try again later or use WhatsApp.")

    row_id = save_enquiry(enquiry, ip)
    try:
        send_email(build_message(enquiry))
    except Exception:  # noqa: BLE001 - report any delivery failure honestly
        log.exception("Email delivery failed for enquiry %s", row_id)
        set_email_status(row_id, "failed")
        raise HTTPException(502, "Your enquiry was received but we could not send the notification email. Please contact us on WhatsApp so we do not miss it.")
    set_email_status(row_id, "sent")
    return {"ok": True}
