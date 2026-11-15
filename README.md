# L&R Web Technologies – Official Website

React + Vite + TypeScript + Tailwind CSS + Framer Motion + Lucide, with a small FastAPI backend for the contact form.

## 1. Run the website

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build in /dist
npm run preview
```

Requires Node 18+ (Node 20/22 recommended).

## 2. Run the contact-form backend (required for real enquiries)

The contact form sends enquiries to **your own** API, which emails them to lrwebtechnologies@gmail.com.
The form only shows "success" after the server confirms the email was sent.

```bash
cd server
python -m venv .venv && source .venv/bin/activate     # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env        # then edit .env (see below)
uvicorn main:app --reload --port 8000
```

In development, Vite proxies `/api` to `http://127.0.0.1:8000`, so run both servers.

### Email setup (Gmail)
1. Turn on 2-Step Verification for lrwebtechnologies@gmail.com.
2. Create an **App password** (Google Account → Security → App passwords).
3. Put it in `server/.env` as `SMTP_PASSWORD`. Never put it in the frontend.
4. To notify **both** business contacts, add the second email to `NOTIFY_TO` (comma separated).

Spam protection built in: hidden honeypot field, minimum-fill-time check, per-IP rate limit, privacy consent.
Every valid enquiry is also saved to `server/enquiries.db` (SQLite) so none are lost if email fails.

## 3. Deploy

* **Frontend**: Vercel / Netlify / any static host (`vercel.json` and `public/_redirects` handle clean URLs).
* **Backend**: any Python host (Render, Railway, Fly.io, a VPS). Set the env vars from `server/.env.example`
  and set `ALLOWED_ORIGINS` to your website's address.
* Then set `VITE_API_URL` (frontend env) to the backend URL, e.g. `https://api.your-domain.com`, and rebuild.
* After you have a domain: update `public/sitemap.xml`, `public/robots.txt`.

## 4. Things you can edit (all in `src/data`)

| File | What it controls |
| --- | --- |
| `site.ts` | Email, Instagram, WhatsApp numbers, tagline, currency fallback rates, payment methods |
| `pricing.ts` | The three packages (prices are **provisional**) and maintenance plans |
| `estimator.ts` | Every price rule used by the Project Cost Estimator |
| `services.ts` | The 10 services and their detail pages |
| `projects.ts` | Portfolio projects, links and screenshots (`public/images`) |
| `testimonials.ts` | Add **genuine** testimonials here; empty = honest empty state |
| `faq.ts` | FAQ assistant answers and keywords |
| `process.ts` | The 12 process steps |

## 5. Notes

* Theme (3 options) and currency (INR/USD/EUR/GBP) are saved in local storage.
* Converted currencies are always labelled "approximate". The site tries a free, key-less exchange-rate
  endpoint and falls back to the manual rates in `site.ts`.
* The Terms and Privacy pages are sensible general drafts. Please have them reviewed for your situation
  (for example ownership/IP transfer, refund policy and governing law) before relying on them.
* No language selector exists; the whole site is English.
