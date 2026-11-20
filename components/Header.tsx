"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import TransitionLink from "./TransitionLink";
import { site } from "@/content/site";
import { gsap, EASE, reduced } from "@/lib/gsap";
import { lockScroll } from "@/lib/lenis";

const LINKS = [
  ["Home", "/"],
  ["What I Do", "/services"],
  ["Work", "/work"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

export default function Header() {
  const initials = site.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => { setOpen(false); }, [path]);

  // full-screen menu (below 900px)
  useEffect(() => {
    const m = menu.current;
    if (!m) return;
    const items = m.querySelectorAll("[data-mi]");
    const rm = reduced();
    if (open) {
      lockScroll(true);
      gsap.set(m, { visibility: "visible" });
      gsap.fromTo(m, { clipPath: "circle(0% at 94% 5%)" }, { clipPath: "circle(150% at 94% 5%)", duration: rm ? 0 : 0.9, ease: "power3.inOut" });
      gsap.fromTo(items, { yPercent: 110 }, { yPercent: 0, duration: rm ? 0 : 1, ease: EASE, stagger: 0.07, delay: rm ? 0 : 0.25 });
    } else {
      lockScroll(false);
      gsap.to(m, { clipPath: "circle(0% at 94% 5%)", duration: rm ? 0 : 0.6, ease: "power3.inOut", onComplete: () => { gsap.set(m, { visibility: "hidden" }); } });
    }
  }, [open]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <>
      <header className="pointer-events-none fixed left-5 right-5 top-4 z-[60] flex items-center justify-between gap-3 font-sans text-petrol max-[560px]:left-4 max-[560px]:right-4">
        <TransitionLink
          href="/" aria-label={`${site.name} — home`}
          className="glass-pill pointer-events-auto flex h-12 items-center gap-2.5 rounded-full !text-petrol no-underline"
          style={{ padding: "0 20px 0 10px" }}
        >
          <span aria-hidden className="flex h-7 w-7 items-center justify-center rounded-full bg-petrol font-display text-[11px] font-semibold text-white">{initials}</span>
          <span className="whitespace-nowrap text-[15px] font-semibold leading-none tracking-[-.01em]">{site.name}</span>
        </TransitionLink>

        <nav aria-label="Primary" className="glass-pill pointer-events-auto hidden gap-0.5 rounded-full p-1 min-[900px]:flex">
          {LINKS.map(([label, href]) => (
            <TransitionLink
              key={href} href={href} aria-current={active(href) ? "page" : undefined}
              className={`inline-flex h-10 items-center rounded-full px-5 text-sm font-medium leading-none !text-petrol no-underline transition-colors duration-300 hover:bg-petrol/5 ${active(href) ? "bg-petrol/10" : ""}`}
            >
              {label}
            </TransitionLink>
          ))}
        </nav>

        <TransitionLink
          href="/contact"
          className="cta-pill pointer-events-auto hidden h-12 items-center gap-3.5 whitespace-nowrap rounded-full bg-petrol !text-white no-underline transition-[gap] duration-300 hover:gap-[18px] min-[900px]:inline-flex"
          style={{ padding: "0 8px 0 22px" }}
        >
          <span>Let’s Work Together</span>
          <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[15px] text-petrol">→</span>
        </TransitionLink>

        <button
          type="button" aria-expanded={open} aria-controls="site-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}
          className="glass-pill pointer-events-auto relative z-[70] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full p-0 text-petrol min-[900px]:hidden"
        >
          <span aria-hidden className={`burger ${open ? "is-open" : ""}`}><i /><i /><i /></span>
        </button>
      </header>

      <div id="site-menu" ref={menu} style={{ visibility: "hidden" }} className="fixed inset-0 z-[55] flex flex-col justify-center bg-white px-[6vw] min-[900px]:hidden">
        <ul className="m-0 grid list-none gap-2 p-0">
          {LINKS.map(([label, href], i) => (
            <li key={href} className="overflow-hidden">
              <div data-mi>
                <TransitionLink href={href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 font-display text-[clamp(44px,13vw,96px)] font-semibold leading-[1] tracking-[-.03em] !text-petrol no-underline">
                  <span className="font-sans text-xs font-medium tracking-[.14em] !text-teal">0{i + 1}</span>
                  <span className={active(href) ? "!text-teal" : ""}>{label}</span>
                </TransitionLink>
              </div>
            </li>
          ))}
        </ul>
        <TransitionLink href="/contact" onClick={() => setOpen(false)} className="mt-10 inline-flex h-12 w-fit items-center gap-3.5 rounded-full bg-petrol !text-white no-underline" style={{ padding: "0 8px 0 22px" }}>
          Let’s Work Together
          <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-petrol">→</span>
        </TransitionLink>
      </div>
    </>
  );
}
