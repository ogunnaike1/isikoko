"use client";
import { useEffect, useRef } from "react";
import { gsap, EASE, reduced } from "@/lib/gsap";

const CELLS = Array.from({ length: 28 }, (_, k) =>
  [3, 9, 10, 16, 22, 25].includes(k) ? "#367C83" : [5, 13, 20].includes(k) ? "#182C31" : k === 17 ? "#D8E69A" : "#fff");
const BG = ["#EAF0ED", "#182C31", "#367C83", "#D8E69A", "#dfe8e4"];

/** The five Expertise scenes from the homepage, as standalone animated art (plays when it scrolls into view). */
export default function ServiceArt({ i }: { i: number }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const r = root.current!;
      const els = r.querySelectorAll("[data-el],[data-bar],[data-fill]");
      const rings = r.querySelectorAll("[data-ring]");
      rings.forEach((el, k) => gsap.to(el, { rotation: k % 2 ? -360 : 360, duration: 9 + k * 4, ease: "none", repeat: -1 }));
      if (reduced()) return;
      const st = { trigger: r, start: "top 80%" };
      if (i === 0) gsap.from(els, { scale: 0, duration: 0.5, stagger: { each: 0.02, from: "random" }, ease: "back.out(1.8)", scrollTrigger: st });
      if (i === 1) gsap.to(els, { rotation: (k) => [-9, 0, 9][k], x: (k) => [-34, 0, 34][k], duration: 1.1, ease: EASE, scrollTrigger: st });
      if (i === 2) {
        gsap.from(els[0], { scale: 0.5, duration: 0.9, ease: "back.out(1.6)", scrollTrigger: st });
        gsap.from(els[1], { scaleX: 0, duration: 2, ease: "power2.inOut", scrollTrigger: st });
      }
      if (i === 3) gsap.from(rings, { scale: 0.5, opacity: 0, duration: 1, ease: EASE, stagger: 0.12, scrollTrigger: st });
      if (i === 4) gsap.from(els, { scaleY: 0, duration: 1, ease: EASE, stagger: 0.08, scrollTrigger: st });
    }, root);
    return () => ctx.revert();
  }, [i]);

  const wrap = "absolute inset-0 flex items-center justify-center";
  return (
    <div ref={root} className="relative h-full w-full overflow-hidden" style={{ background: BG[i] }}>
      {i === 0 && (
        <div className={wrap}>
          <div className="grid" style={{ width: "68%", gridTemplateColumns: "repeat(7,1fr)", gap: "clamp(4px,.7vw,10px)" }}>
            {CELLS.map((c, k) => <div key={k} data-el style={{ aspectRatio: "1", background: c }} />)}
          </div>
        </div>
      )}
      {i === 1 && (
        <div className={wrap}>
          <div className="relative" style={{ width: "34%", aspectRatio: "3/4" }}>
            {["#fff", "#D8E69A", "#367C83"].map((c) => <div key={c} data-el className="absolute inset-0" style={{ background: c }} />)}
          </div>
        </div>
      )}
      {i === 2 && (
        <div className={wrap}>
          <div data-el className="flex items-center justify-center rounded-full bg-white" style={{ width: "30%", aspectRatio: "1" }}>
            <div style={{ width: 0, height: 0, marginLeft: "8%", borderStyle: "solid", borderWidth: "clamp(10px,2.2vw,30px) 0 clamp(10px,2.2vw,30px) clamp(16px,3.6vw,50px)", borderColor: "transparent transparent transparent #182C31" }} />
          </div>
          <div className="absolute h-1" style={{ left: "12%", right: "12%", bottom: "12%", background: "rgba(255,255,255,.35)" }}>
            <div data-fill className="h-full origin-left bg-white" />
          </div>
        </div>
      )}
      {i === 3 && (
        <div className={wrap}>
          <div className="relative" style={{ width: "76%", aspectRatio: "1" }}>
            <div data-ring className="absolute inset-0 rounded-full border-2 border-petrol"><i className="absolute left-1/2 top-0 -ml-[7px] -mt-[7px] h-3.5 w-3.5 rounded-full bg-teal" /></div>
            <div data-ring className="absolute rounded-full border-2 border-petrol" style={{ inset: "20%" }}><i className="absolute bottom-0 left-1/2 -mb-[7px] -ml-[7px] h-3.5 w-3.5 rounded-full bg-petrol" /></div>
            <div data-ring className="absolute rounded-full border-2 border-petrol" style={{ inset: "40%" }}><i className="absolute left-0 top-1/2 -ml-1.5 -mt-1.5 h-3 w-3 rounded-full bg-teal" /></div>
          </div>
        </div>
      )}
      {i === 4 && (
        <div className={`${wrap} !items-end`} style={{ paddingBottom: "14%" }}>
          <div className="flex items-end" style={{ width: "64%", height: "56%", gap: "4%" }}>
            {[30, 48, 40, 72, 100].map((h, k) => <div key={k} data-bar className="flex-1 origin-bottom" style={{ height: `${h}%`, background: k === 4 ? "#182C31" : "#367C83" }} />)}
          </div>
        </div>
      )}
    </div>
  );
}
