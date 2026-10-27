"use server";
import { headers } from "next/headers";
import { contactPage } from "@/content/pages";

export type FormState = {
  ok: boolean;
  message?: string;
  errors?: Partial<Record<"name" | "email" | "company" | "service" | "message", string>>;
  values?: Record<string, string>;
};

const MIN_FILL_MS = 2500;          // humans take longer than this to fill a form
const MAX_AGE_MS = 1000 * 60 * 60 * 6;
const RATE = { max: 5, windowMs: 1000 * 60 * 60 };
const hits = new Map<string, number[]>(); // per-instance; swap for Redis/Upstash if you scale out

const clean = (v: FormDataEntryValue | null, max: number) =>
  String(v ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

async function deliver(d: { name: string; email: string; company: string; service: string; message: string }) {
  const key = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO_EMAIL, from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) {
    if (process.env.NODE_ENV !== "production") { console.log("[contact] (dev — email not configured)\n", d); return true; }
    console.error("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL are not set");
    return false;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from, to: [to], reply_to: d.email,
      subject: `New enquiry from ${d.name}${d.company ? ` · ${d.company}` : ""}`,
      text: `Name: ${d.name}\nEmail: ${d.email}\nCompany: ${d.company || "—"}\nService: ${d.service || "—"}\n\n${d.message}`,
      html: `<p><b>${esc(d.name)}</b> &lt;${esc(d.email)}&gt;${d.company ? ` · ${esc(d.company)}` : ""}</p><p>Service: ${esc(d.service || "—")}</p><p style="white-space:pre-wrap">${esc(d.message)}</p>`,
    }),
  });
  if (!res.ok) console.error("[contact] Resend error", res.status, await res.text());
  return res.ok;
}

export async function sendMessage(_prev: FormState, fd: FormData): Promise<FormState> {
  const values = {
    name: clean(fd.get("name"), 100), email: clean(fd.get("email"), 254), company: clean(fd.get("company"), 100),
    service: clean(fd.get("service"), 60), message: clean(fd.get("message"), 4000),
  };

  // anti-spam 1: honeypot — real users never see this field. Pretend success so bots learn nothing.
  if (clean(fd.get("website"), 200)) return { ok: true };

  // anti-spam 2: time trap
  const age = Date.now() - Number(clean(fd.get("t"), 20));
  if (!Number.isFinite(age) || age < MIN_FILL_MS || age > MAX_AGE_MS)
    return { ok: false, values, message: "That was a little quick — please check your details and send again." };

  // anti-spam 3: rate limit per IP
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE.windowMs);
  if (recent.length >= RATE.max) return { ok: false, values, message: "Too many messages from this connection. Please try again later." };
  hits.set(ip, [...recent, now]);

  // validation
  const errors: NonNullable<FormState["errors"]> = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@<>()\\,;:"]+@[^\s@<>()\\,;:"]+\.[^\s@<>()\\,;:"]{2,}$/.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.service && !contactPage.services.includes(values.service)) errors.service = "Please choose one of the options.";
  if (values.message.length < 10) errors.message = "Tell me a little more (at least 10 characters).";
  else if ((values.message.match(/https?:\/\//gi) ?? []).length > 2) errors.message = "Please include at most two links.";
  if (Object.keys(errors).length) return { ok: false, values, errors };

  const sent = await deliver(values);
  return sent ? { ok: true } : { ok: false, values, message: "The message could not be sent right now. Please try again shortly." };
}
