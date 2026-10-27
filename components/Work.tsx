"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { homeCards } from "@/content/projects";
import Image from "next/image";
import Sheet from "./Sheet";

export default function Work() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = (s: string) => gsap.utils.toArray<HTMLElement>(s);
      // heading lines slide in from opposite sides; teal rule draws
      const wst = { trigger: "[data-whead]", start: "top 90%", end: "top 35%", scrub: true };
      q("[data-wl]").forEach((w) => gsap.fromTo(w, { x: Number(w.dataset.dir) * innerWidth * 0.16 }, { x: 0, ease: "none", scrollTrigger: wst }));
      gsap.to("[data-wbar]", { scaleX: 1, ease: "none", scrollTrigger: wst });

      const cards = q("[data-card]");
      cards.forEach((c, k) => {
        const img = c.querySelector("[data-cimg]")!, z = c.querySelector<HTMLElement>("[data-zoom]")!;
        const st = { trigger: c, start: "top 92%", end: "top 45%", scrub: true };
        gsap.fromTo(img, { clipPath: k % 2 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: st });
        gsap.fromTo(c.children[1], { y: 36, opacity: 0 }, { y: 0, opacity: 1, ease: "none", scrollTrigger: st });
        gsap.fromTo(z, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: c, scrub: true, start: "top bottom", end: "bottom top" } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} id="work" className="relative z-[2]" style={{ marginTop: "-100vh" }}>
      {/* transparent backdrop: the curved corners reveal the full-bleed hero panel (Project One) */}
      <Sheet backdrop="transparent" flush style={{ padding: "22vh 3vw 16vh" }}>
        <div className="mb-[9vh] flex flex-wrap items-end justify-between gap-6">
          <div data-whead>
            <h2 aria-label="More selected work" className="m-0 font-display font-semibold" style={{ fontSize: "clamp(48px,9vw,150px)", lineHeight: 0.88, letterSpacing: "-.03em" }}>
              <span data-wl data-dir="-1" className="block">More selected</span>
              <span data-wl data-dir="1" className="block text-teal">work</span>
            </h2>
            <div data-wbar className="mt-[22px] h-[3px] origin-left scale-x-0 bg-teal" />
          </div>
          <p className="m-0 max-w-[300px] text-sm leading-relaxed text-ink-3">Social, video, influencer and campaign projects.</p>
        </div>

        <div className="grid" style={{ gridTemplateColumns: "repeat(12,minmax(0,1fr))", gap: "clamp(36px,6vw,90px) 2vw" }}>
          {homeCards.map((p) => (
            <article key={p.slug} data-card className="group" style={{ gridColumn: p.card!.col, marginTop: p.card!.offset ?? 0 }}>
              <div data-cimg className="relative overflow-hidden bg-mist" style={{ aspectRatio: p.card!.ratio }}>
                <div data-zoom className="absolute" style={{ inset: "-7%" }}>
                  <div className="relative h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]">
                    {p.cover && <Image src={p.cover.src} alt={p.cover.alt} fill sizes="(min-width: 900px) 60vw, 100vw" className="object-cover" style={{ objectPosition: p.cover.pos }} />}
                  </div>
                </div>
              </div>
              <div className="flex items-baseline justify-between gap-3.5 border-b border-mist-line py-4">
                <h3 className="m-0 font-display font-medium" style={{ fontSize: "clamp(24px,2.4vw,38px)", lineHeight: 1.05, letterSpacing: "-.01em" }}>{p.title}</h3>
                <span className="text-right font-sans text-[11px] font-medium uppercase tracking-[.12em] text-ink-3">{p.card!.cat}</span>
              </div>
            </article>
          ))}
        </div>
      </Sheet>
    </div>
  );
}
