"use client";
import { useEffect, useRef, useState } from "react";
import { Flip } from "gsap/Flip";
import { gsap, ScrollTrigger, reduced } from "@/lib/gsap";
import { categories, categoryLabel, visual, type Category, type Project } from "@/content/projects";
import Image from "next/image";
import TransitionLink from "./TransitionLink";

if (typeof window !== "undefined") gsap.registerPlugin(Flip);

type Filter = "all" | Category;

export default function WorkGrid({ items }: { items: Project[] }) {
  const [active, setActive] = useState<Filter>("all");
  const [count, setCount] = useState(items.length);
  const grid = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);

  // "View" cursor that follows the pointer over cards (fine pointers only)
  useEffect(() => {
    if (!matchMedia("(pointer:fine)").matches || reduced()) return;
    const g = grid.current!, c = cursor.current!;
    gsap.set(c, { xPercent: -50, yPercent: -50, scale: 0 });
    const x = gsap.quickTo(c, "x", { duration: 0.45, ease: "power3" });
    const y = gsap.quickTo(c, "y", { duration: 0.45, ease: "power3" });
    const move = (e: MouseEvent) => { x(e.clientX); y(e.clientY); };
    const over = (e: MouseEvent) => gsap.to(c, { scale: (e.target as HTMLElement).closest("[data-pcard]") ? 1 : 0, duration: 0.5, ease: "back.out(1.6)", overwrite: "auto" });
    const out = () => gsap.to(c, { scale: 0, duration: 0.3, overwrite: "auto" });
    g.addEventListener("mousemove", move); g.addEventListener("mouseover", over); g.addEventListener("mouseleave", out);
    return () => { g.removeEventListener("mousemove", move); g.removeEventListener("mouseover", over); g.removeEventListener("mouseleave", out); };
  }, []);

  const change = (k: Filter) => {
    if (k === active) return;
    const cards = gsap.utils.toArray<HTMLElement>("[data-pcard]", grid.current);
    const apply = () => cards.forEach((c) => { c.style.display = k === "all" || c.dataset.cat === k ? "" : "none"; });
    setActive(k);
    setCount(k === "all" ? items.length : items.filter((p) => p.category === k).length);
    if (reduced()) { apply(); ScrollTrigger.refresh(); return; }
    const state = Flip.getState(cards);
    apply();
    Flip.from(state, {
      duration: 0.9, ease: "power3.inOut", stagger: 0.05, absolute: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: "expo.out" }),
      onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.35 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  };

  const chip = (on: boolean) =>
    `cursor-pointer rounded-full border px-4 py-2 font-sans text-xs font-medium tracking-[.04em] transition-colors duration-300 ${on ? "border-teal bg-teal text-white" : "border-mist-line bg-white text-petrol hover:border-teal"}`;

  return (
    <>
      <div className="sticky z-20 -mx-[3vw] mb-[6vh] flex flex-wrap items-center justify-between gap-4 bg-white/90 px-[3vw] py-4 backdrop-blur-md" style={{ top: "calc(6vh + clamp(44px,4.4vw,60px)*1.143)" }}>
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={active === "all"} onClick={() => change("all")} className={chip(active === "all")}>All</button>
          {categories.map((c) => (
            <button key={c.key} type="button" aria-pressed={active === c.key} onClick={() => change(c.key)} className={chip(active === c.key)}>{c.label}</button>
          ))}
        </div>
        <span aria-live="polite" className="font-sans text-xs font-medium uppercase tracking-[.14em] text-ink-3">{String(count).padStart(2, "0")} {count === 1 ? "project" : "projects"}</span>
      </div>

      <div ref={grid} className="grid grid-cols-1 items-start gap-x-[2vw] gap-y-[clamp(36px,6vw,90px)] md:grid-cols-2">
        {items.map((p, i) => {
          const v = visual(p, i);
          return (
            <TransitionLink key={p.slug} href={`/work/${p.slug}`} data-pcard data-cat={p.category} className="group block !text-petrol no-underline" aria-label={`${p.title} — ${p.category}`}>
              <div data-fx="clip" data-dir={i % 2 ? "r" : "l"} className="relative overflow-hidden bg-mist" style={{ aspectRatio: v.ratio }}>
                <div data-par className="absolute" style={{ inset: "-8%" }}>
                  <div className="relative h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]" style={{ background: v.img ? undefined : `repeating-linear-gradient(135deg,${v.c1} 0 12px,${v.c2} 12px 24px)` }}>
                    {v.img && <Image src={v.img.src} alt={v.img.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" style={{ objectPosition: v.img.pos }} />}
                  </div>
                </div>
                {!v.img && <span className="absolute bottom-3.5 left-4 font-sans text-[10px] font-medium uppercase tracking-[.14em] text-ink-3">{v.media}</span>}
              </div>
              <div className="flex items-baseline justify-between gap-3.5 border-b border-mist-line py-4">
                <h3 className="m-0 font-display font-medium" style={{ fontSize: "clamp(24px,2.4vw,38px)", lineHeight: 1.05, letterSpacing: "-.01em" }}>{p.title}</h3>
                <span className="text-right font-sans text-[11px] font-medium uppercase tracking-[.12em] text-ink-3">{categoryLabel(p.category)}</span>
              </div>
            </TransitionLink>
          );
        })}
      </div>

      <div ref={cursor} aria-hidden className="pointer-events-none fixed left-0 top-0 z-50 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-teal font-sans text-xs font-bold uppercase tracking-[.1em] text-white">View</div>
    </>
  );
}
