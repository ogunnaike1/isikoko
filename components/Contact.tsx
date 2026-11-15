"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { splitWordsReveal } from "@/lib/splitWords";
import { site } from "@/content/site";
import Sheet from "./Sheet";

export default function Contact() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      splitWordsReveal(root.current!.querySelector<HTMLElement>("[data-split]")!);
    }, root);
    return () => ctx.revert();
  }, []);

  const rows = [
    ["Email", site.email, `mailto:${site.email}`],
    ["WhatsApp", site.whatsapp, site.whatsappLink],
    ["LinkedIn", site.linkedin, site.linkedin],
    ["Location", site.location, ""],
  ].filter(([, v]) => v);

  return (
    <div ref={root} className="relative z-[5]">
      <Sheet id="contact" backdrop="#182C31" className="relative flex flex-col gap-10 overflow-hidden md:block" style={{ minHeight: "100vh", padding: "20vh 3vw 3vh" }}>
        <h2 data-split className="m-0 w-full font-display font-medium md:w-[min(34vw,520px)] md:min-w-[260px]" style={{ fontSize: "clamp(24px,2.6vw,42px)", lineHeight: 1.08, letterSpacing: "-.015em" }}>
          Have a brand to grow? Let&apos;s make content people remember.
        </h2>

        <ul className="static m-0 grid list-none gap-3.5 break-words p-0 font-sans text-xs font-medium uppercase tracking-[.1em] text-ink-2 md:absolute md:right-[3vw] md:top-[20vh] md:w-[min(24vw,330px)] md:min-w-[220px]">
          {rows.map(([k, v, href]) => (
            <li key={k}>{k} — {href ? <a href={href}>{v}</a> : v}</li>
          ))}
        </ul>
      </Sheet>
    </div>
  );
}
