"use client";
import { useEffect, useRef } from "react";
import { gsap, reduced } from "@/lib/gsap";
import { splitWordsReveal } from "@/lib/splitWords";
import { useMagnetic } from "@/lib/useMagnetic";
import { site } from "@/content/site";
import Sheet from "./Sheet";
import TransitionLink from "./TransitionLink";

export default function Contact() {
  const root = useRef<HTMLDivElement>(null);
  useMagnetic(root);

  useEffect(() => {
    const rm = reduced();
    const ctx = gsap.context(() => {
      splitWordsReveal(root.current!.querySelector<HTMLElement>("[data-split]")!);
      if (rm) return;
      // same letter choreography as the hero wordmark
      const cl = gsap.utils.toArray<HTMLElement>("[data-cl]");
      gsap.set(cl, { yPercent: 70, opacity: 0, color: "#b7c7c4" });
      gsap.timeline({ scrollTrigger: { trigger: "#contact", start: "top 45%" } })
        .to(cl, { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.1 }, 0)
        .to(cl, { color: "#182C31", duration: 0.7, ease: "none", stagger: 0.1 }, 0.25);
      gsap.from("[data-cta]", { scale: 0, duration: 0.9, ease: "back.out(1.6)", scrollTrigger: { trigger: "#contact", start: "top 40%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  const rows = [["Email", site.email], ["LinkedIn", site.linkedin], ["Location", site.location]];

  return (
    <div ref={root} className="relative z-[5]">
      <Sheet id="contact" backdrop="#182C31" className="relative overflow-hidden" style={{ minHeight: "100vh", padding: "20vh 3vw 3vh" }}>
        <h2 data-split className="m-0 font-display font-medium" style={{ width: "min(34vw,520px)", minWidth: 260, fontSize: "clamp(24px,2.6vw,42px)", lineHeight: 1.08, letterSpacing: "-.015em" }}>
          Have a brand to grow? Let&apos;s make content people remember.
        </h2>

        <TransitionLink
          data-mag data-cta href="/contact"
          className="absolute z-[3] flex items-center justify-center rounded-full bg-teal font-sans text-sm font-bold !text-white no-underline hover:bg-teal-hover"
          style={{ left: "36vw", top: "22vh", width: "clamp(110px,11vw,170px)", aspectRatio: "1" }}
        >
          Get in touch
        </TransitionLink>

        <ul className="absolute m-0 grid list-none gap-3.5 p-0 font-sans text-xs font-medium uppercase tracking-[.1em] text-ink-2" style={{ right: "3vw", top: "20vh", width: "min(24vw,330px)", minWidth: 220 }}>
          {rows.map(([k, v]) => (
            <li key={k}>{k} — {v ? <a href={k === "Email" ? `mailto:${v}` : v}>{v}</a> : "add in site config"}</li>
          ))}
        </ul>

        <div className="absolute flex justify-between font-sans text-[11px] font-medium tracking-[.1em]" style={{ left: "3vw", right: "3vw", bottom: "calc(3vh + min(16vw,32vh)*.8 + 14px)" }}>
          <span>Strategy</span><span style={{ marginLeft: "18vw" }}>Content</span><span>Results</span>
        </div>

        <div aria-label="Connect" className="absolute flex whitespace-nowrap font-display font-semibold" style={{ left: "3vw", bottom: "3vh", fontSize: "min(16vw,32vh)", lineHeight: 0.8, letterSpacing: ".015em" }}>
          {"CONNECT".split("").map((c, i) => (
            <span key={i} aria-hidden className="block overflow-hidden" style={{ padding: ".05em 0 .02em" }}><span data-cl className="block">{c}</span></span>
          ))}
        </div>
      </Sheet>
    </div>
  );
}
