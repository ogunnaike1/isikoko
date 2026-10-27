"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, EASE } from "@/lib/gsap";
import { splitWordsReveal } from "@/lib/splitWords";
import Image from "next/image";
import { services } from "@/content/services";
import Sheet from "./Sheet";

const hidden = { clipPath: "circle(0% at 50% 50%)" };
const sceneBase = "absolute inset-0 overflow-hidden bg-mist";

export default function Expertise() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = (s: string) => gsap.utils.toArray<HTMLElement>(s);
      splitWordsReveal(root.current!.querySelector<HTMLElement>("[data-split]")!);

      // <900px: stage sticks at the top, list scrolls beneath it
      if (innerWidth < 900) {
        gsap.set("[data-sgrid]", { gridTemplateColumns: "1fr", rowGap: 0 });
        gsap.set("[data-swrap]", { position: "static", gridRow: "1 / span 2", gridColumn: 1, alignSelf: "stretch" });
        gsap.set("[data-spanel]", { position: "sticky", top: 72, height: "34vh", zIndex: 3 });
        gsap.set("[data-slist]", { gridRow: 2, gridColumn: 1, marginTop: "calc(34vh + 16px)", position: "relative", zIndex: 1, background: "#fff" });
        gsap.set("[data-sblock]", { minHeight: "40vh" });
      }

      const scenes = q("[data-scene]"), names = q("[data-sname]"), descs = q("[data-sdesc]"), blocks = q("[data-sblock]");
      let cur = 0, z = 1;

      // each photo settles from a slow zoom as its scene wipes in
      const enter = (i: number) => gsap.fromTo(scenes[i].querySelector("[data-kb]"), { scale: 1.22 }, { scale: 1, duration: 1.8, ease: EASE, overwrite: true });

      const paint = (i: number) => {
        gsap.to(names, { color: (k) => (k === i ? "#182C31" : "#bccac7"), duration: 0.5 });
        gsap.to(descs, { opacity: (k) => (k === i ? 1 : 0.45), duration: 0.5 });
        gsap.to("[data-cnt]", { yPercent: -20 * i, duration: 0.7, ease: "power3.inOut" });
      };
      const activate = (i: number) => {
        if (i === cur) return;
        cur = i; paint(i);
        const sc = scenes[i]; sc.style.zIndex = String(++z);
        gsap.fromTo(sc, { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)", duration: 0.9, ease: "power3.inOut", overwrite: true });
        enter(i);
      };
      paint(0); scenes[0].style.zIndex = "1";
      ScrollTrigger.create({ trigger: "[data-spanel]", start: "top 85%", once: true, onEnter: () => enter(0) });
      blocks.forEach((b, i) => ScrollTrigger.create({ trigger: b, start: "top 58%", end: "bottom 58%", onToggle: (self) => self.isActive && activate(i) }));
      gsap.to("[data-pfill]", { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-slist]", start: "top 58%", end: "bottom 58%", scrub: true } });

      // drift as the About sheet rises
      gsap.to("[data-sblock]", { yPercent: -4, ease: "none", scrollTrigger: { trigger: "#about", start: "top 95%", end: "top 20%", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative z-[3]">
      <Sheet id="services" backdrop="#182C31" style={{ padding: "20vh 3vw 14vh" }}>
        <div className="mb-[8vh] flex flex-wrap items-end justify-between gap-6">
          <h2 data-split className="m-0 font-display font-semibold" style={{ fontSize: "clamp(48px,9vw,150px)", lineHeight: 0.88, letterSpacing: "-.03em" }}>Expertise</h2>
          <span className="font-sans text-xs font-medium uppercase tracking-[.14em] text-ink-3">Five ways I help brands</span>
        </div>

        <div data-sgrid className="grid items-start" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", gap: "clamp(20px,5vw,90px)" }}>
          {/* sticky stage */}
          <div data-swrap className="sticky z-[2]" style={{ top: "max(72px,10vh)" }}>
            <div data-spanel className="relative overflow-hidden bg-mist" style={{ height: "clamp(230px,46vw,72vh)" }}>
              {services.map((sv, k) => (
                <div key={sv.n} data-scene className={sceneBase} style={k ? hidden : undefined}>
                  <div data-kb className="absolute inset-0">
                    <Image src={sv.img.src} alt={sv.img.alt} fill sizes="(min-width: 900px) 48vw, 100vw" priority={k === 0} className="object-cover" style={{ objectPosition: sv.img.pos }} />
                  </div>
                </div>
              ))}
              {/* counter */}
              <div className="absolute z-[5] flex items-center gap-2 bg-white font-display text-sm font-semibold tracking-[.04em] text-petrol" style={{ left: 16, top: 16, padding: "8px 14px" }}>
                <div className="overflow-hidden" style={{ height: "1.2em", lineHeight: 1.2 }}>
                  <div data-cnt>{services.map((s) => <div key={s.n}>{s.n}</div>)}</div>
                </div>
                <span className="text-ink-3">/ 05</span>
              </div>
            </div>
          </div>

          {/* list */}
          <div data-slist className="relative" style={{ paddingLeft: 28 }}>
            <div className="absolute bottom-0 left-0 top-0 w-0.5 bg-mist" />
            <div data-pfill className="absolute bottom-0 left-0 top-0 w-0.5 origin-top scale-y-0 bg-teal" />
            {services.map((s) => (
              <div key={s.n} data-sblock className="flex flex-col justify-center gap-4" style={{ minHeight: "52vh", padding: "5vh 0" }}>
                <span className="font-sans text-xs font-medium tracking-[.14em] text-teal">{s.n}</span>
                <div data-sname className="font-display font-semibold" style={{ fontSize: "clamp(32px,4.6vw,76px)", lineHeight: 0.98, letterSpacing: "-.025em", color: "#bccac7" }}>{s.name}</div>
                <p data-sdesc className="m-0 max-w-[480px] text-base leading-relaxed text-ink-2" style={{ opacity: 0.45 }}>{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-full border border-mist-line px-3.5 py-[7px] font-sans text-xs font-medium text-petrol transition-colors hover:border-teal hover:bg-teal hover:text-white">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Sheet>
    </div>
  );
}
