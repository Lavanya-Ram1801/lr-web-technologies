export interface EnquiryPayload {
  fullName: string;
  email: string;
  whatsapp: string;
  company: string;
  service: string;
  description: string;
  budget: string;
  contactMethod: string;
  consent: boolean;
  /** Honeypot - real users never fill this in. */
  website: string;
  /** Milliseconds between form display and submit (bots submit instantly). */
  elapsedMs: number;
}

export type SubmitResult = { ok: true } | { ok: false; error: string };

const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

/**
 * Sends the enquiry to our own backend (see /server), which delivers the
 * email using server-side credentials. No secrets exist in the frontend.
 * Returns ok:true ONLY when the server confirms the message was delivered.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<SubmitResult> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 20000);
  try {
    const res = await fetch(`${API_BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    let data: { ok?: boolean; detail?: unknown; error?: string } = {};
    try {
      data = await res.json();
    } catch {
      /* non-JSON response */
    }
    if (res.ok && data.ok === true) return { ok: true };
    const detail = typeof data.detail === "string" ? data.detail : data.error;
    return {
      ok: false,
      error: detail || `The server could not process your enquiry (status ${res.status}).`,
    };
  } catch (err) {
    const aborted = err instanceof DOMException && err.name === "AbortError";
    return {
      ok: false,
      error: aborted
        ? "The request took too long. Please try again or use WhatsApp."
        : "We could not reach our server. Please check your connection or contact us on WhatsApp.",
    };
  } finally {
    window.clearTimeout(timeout);
  }
}
