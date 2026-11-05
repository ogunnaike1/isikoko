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
      <Sheet id="contact" backdrop="#182C31" className="relative overflow-hidden" style={{ minHeight: "100vh", padding: "20vh 3vw 3vh" }}>
        <h2 data-split className="m-0 font-display font-medium" style={{ width: "min(34vw,520px)", minWidth: 260, fontSize: "clamp(24px,2.6vw,42px)", lineHeight: 1.08, letterSpacing: "-.015em" }}>
          Have a brand to grow? Let&apos;s make content people remember.
        </h2>

        <ul className="absolute m-0 grid list-none gap-3.5 p-0 font-sans text-xs font-medium uppercase tracking-[.1em] text-ink-2" style={{ right: "3vw", top: "20vh", width: "min(24vw,330px)", minWidth: 220 }}>
          {rows.map(([k, v, href]) => (
            <li key={k}>{k} — {href ? <a href={href}>{v}</a> : v}</li>
          ))}
        </ul>
      </Sheet>
    </div>
  );
}
