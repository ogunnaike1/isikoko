"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import { gsap, EASE, reduced } from "@/lib/gsap";
import { sendMessage, type FormState } from "@/app/contact/actions";
import { contactPage } from "@/content/pages";

const initial: FormState = { ok: false };
const field = "peer w-full border-0 border-b border-mist-line bg-transparent px-0 pb-3 pt-6 font-sans text-base text-petrol outline-none transition-colors placeholder-transparent focus:border-teal";
const label = "pointer-events-none absolute left-0 top-6 origin-left font-sans text-base text-ink-3 transition-all duration-300 peer-focus:-translate-y-6 peer-focus:scale-[.78] peer-focus:text-teal peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-[.78]";

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initial);
  const [t, setT] = useState("");
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => { setT(String(Date.now())); }, []);

  // success: swap the form for a confirmation that draws its tick
  useEffect(() => {
    if (!state.ok || !root.current || reduced()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-ok] > *", { y: 40, opacity: 0, duration: 1, ease: EASE, stagger: 0.1 });
      gsap.fromTo("[data-tick]", { strokeDashoffset: 60 }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.out", delay: 0.3 });
    }, root);
    return () => ctx.revert();
  }, [state.ok]);

  const err = (k: keyof NonNullable<FormState["errors"]>) =>
    state.errors?.[k] ? <p id={`${k}-err`} role="alert" className="m-0 mt-2 font-sans text-[13px] text-[#a23b2f]">{state.errors[k]}</p> : null;
  const v = state.values ?? {};

  if (state.ok)
    return (
      <div ref={root}>
        <div data-ok className="grid justify-items-start gap-5 py-10">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden>
            <circle cx="32" cy="32" r="31" stroke="#367C83" strokeWidth="1.5" />
            <path data-tick d="M19 33l9 9 17-20" stroke="#367C83" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="60" />
          </svg>
          <h3 className="m-0 font-display text-[clamp(28px,3vw,48px)] font-medium leading-[1.05] tracking-[-.02em]">Message sent. Thank you.</h3>
          <p className="m-0 max-w-[420px] font-sans text-ink-2">I&apos;ll read it and come back to you by email.</p>
        </div>
      </div>
    );

  return (
    <div ref={root}>
      <form action={action} noValidate className="grid gap-9" aria-describedby={state.message ? "form-msg" : undefined}>
        <input type="hidden" name="t" value={t} />
        {/* honeypot — hidden from people and assistive tech */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>

        <div className="relative">
          <input id="name" name="name" placeholder=" " autoComplete="name" required defaultValue={v.name} aria-invalid={!!state.errors?.name} aria-describedby={state.errors?.name ? "name-err" : undefined} className={field} />
          <label htmlFor="name" className={label}>Your name</label>{err("name")}
        </div>
        <div className="relative">
          <input id="email" name="email" type="email" placeholder=" " autoComplete="email" required defaultValue={v.email} aria-invalid={!!state.errors?.email} aria-describedby={state.errors?.email ? "email-err" : undefined} className={field} />
          <label htmlFor="email" className={label}>Email address</label>{err("email")}
        </div>
        <div className="relative">
          <input id="company" name="company" placeholder=" " autoComplete="organization" defaultValue={v.company} className={field} />
          <label htmlFor="company" className={label}>Brand / company (optional)</label>
        </div>
        <div className="relative">
          <select id="service" name="service" defaultValue={v.service ?? ""} className={`${field} cursor-pointer appearance-none`} aria-invalid={!!state.errors?.service}>
            <option value="">What do you need help with?</option>
            {contactPage.services.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <span aria-hidden className="pointer-events-none absolute right-1 top-[34px] h-2 w-2 rotate-45 border-b-[1.5px] border-r-[1.5px] border-petrol" />
          {err("service")}
        </div>
        <div className="relative">
          <textarea id="message" name="message" rows={5} placeholder=" " required defaultValue={v.message} aria-invalid={!!state.errors?.message} aria-describedby={state.errors?.message ? "message-err" : undefined} className={`${field} resize-none`} />
          <label htmlFor="message" className={label}>Tell me about the brand and the goal</label>{err("message")}
        </div>

        {state.message && <p id="form-msg" role="alert" className="m-0 font-sans text-sm text-[#a23b2f]">{state.message}</p>}

        <div>
          <button
            data-mag type="submit" disabled={pending}
            className="cursor-pointer rounded-full border-0 bg-teal px-8 py-4 font-sans text-[13px] font-bold text-white transition-colors hover:bg-teal-hover disabled:cursor-wait disabled:opacity-70"
          >
            {pending ? "Sending…" : "Send message"}
          </button>
        </div>
      </form>
    </div>
  );
}
