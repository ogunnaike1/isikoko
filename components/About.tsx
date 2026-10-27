"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { splitWordsReveal } from "@/lib/splitWords";
import { useMagnetic } from "@/lib/useMagnetic";
import Sheet from "./Sheet";
import TransitionLink from "./TransitionLink";

const facts = [
  ["Approach", "Understand the brand goal, plan the content, execute and refine."],
  ["Core", "Social media, content production, video editing, influencer campaigns, marketing support."],
  ["Also strong in", "Sales support, customer engagement, administrative operations."],
];

export default function About() {
  const root = useRef<HTMLDivElement>(null);
  useMagnetic(root);

  useEffect(() => {
    const ctx = gsap.context(() => {
      splitWordsReveal(root.current!.querySelector<HTMLElement>("[data-split]")!);
      // portrait opens like the hero badge: circle → full frame
      gsap.to("[data-aport]", { clipPath: "circle(75% at 50% 50%)", ease: "none", scrollTrigger: { trigger: "[data-aport]", start: "top 90%", end: "top 30%", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative z-[4]">
      <Sheet id="about" backdrop="#182C31" style={{ padding: "22vh 3vw 16vh" }}>
        <div data-ainner className="grid items-start" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: "clamp(28px,6vw,110px)" }}>
          <div
            data-aport className="flex w-full max-w-[520px] items-end p-[18px] font-sans text-[10px] font-medium uppercase tracking-[.14em] text-ink-3"
            style={{ aspectRatio: "4/5", background: "repeating-linear-gradient(135deg,#EAF0ED 0 12px,#dfe8e4 12px 24px)", clipPath: "circle(0% at 50% 50%)" }}
          >
            Portrait · drop photo
          </div>
          <div>
            <span className="font-sans text-xs font-medium uppercase tracking-[.14em] text-ink-3">About</span>
            <p data-split className="mb-11 mt-[18px] font-display font-medium" style={{ fontSize: "clamp(30px,4vw,64px)", lineHeight: 1.06, letterSpacing: "-.02em" }}>
              Strategy first, craft always. I turn brand goals into content people stop for — planned, produced and published end to end.
            </p>
            <div className="grid gap-7 border-t border-mist-line pt-7" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))" }}>
              {facts.map(([h, b]) => (
                <div key={h}>
                  <h4 className="mb-2.5 mt-0 font-sans text-xs font-bold uppercase tracking-[.14em]">{h}</h4>
                  <p className="m-0 text-sm leading-[1.7] text-ink-3">{b}</p>
                </div>
              ))}
            </div>
            <TransitionLink data-mag href="/about" className="mt-10 inline-block rounded-full border border-teal px-6 py-[13px] font-sans text-[13px] font-bold !text-teal no-underline hover:bg-mist">More about me →</TransitionLink>
          </div>
        </div>
      </Sheet>
    </div>
  );
}
