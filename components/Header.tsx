"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import TransitionLink from "./TransitionLink";
import { images } from "@/content/images";
import { gsap, ScrollTrigger, EASE, reduced } from "@/lib/gsap";
import { lockScroll } from "@/lib/lenis";

const LINKS = [
  ["Home", "/"],
  ["Work", "/work"],
  ["Services", "/services"],
  ["About", "/about"],
] as const;

const THUMB = "clamp(44px,4.4vw,60px)";

export default function Header() {
  const path = usePathname();
  const home = path === "/";
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  // frosted backdrop once the page scrolls (inner pages only; home keeps the transparent hero header)
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // reading-progress line
  useEffect(() => {
    if (home || !bar.current) return;
    const st = ScrollTrigger.create({ start: 0, end: "max", onUpdate: (s) => { gsap.set(bar.current, { scaleX: s.progress }); } });
    return () => st.kill();
  }, [home, path]);

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

  const active = (href: string) => (href === "/" ? home : path.startsWith(href));
  const link = "relative !text-inherit no-underline after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-current after:transition-transform after:duration-500";

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between font-sans text-[11px] font-medium uppercase tracking-[.14em] text-petrol pointer-events-none"
        style={{ padding: `calc(3vh + 6px) 3vw 0 calc(3vw + ${THUMB} + 20px)` }}
      >
        {!home && (
          <>
            <div aria-hidden className="absolute inset-x-0 top-0 bg-white/85 backdrop-blur-md transition-opacity duration-500" style={{ height: `calc(6vh + ${THUMB}*1.143)`, opacity: solid ? 1 : 0 }} />
            <TransitionLink
              href="/" aria-label="Home"
              className="pointer-events-auto absolute block overflow-hidden"
              style={{ left: "3vw", top: "3vh", width: THUMB, aspectRatio: "7/8" }}
            >
              <Image src={images.aboutPortrait.src} alt="" fill sizes="60px" className="object-cover" />
            </TransitionLink>
            <div ref={bar} aria-hidden className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-teal" />
          </>
        )}

        <nav aria-label="Primary" className="pointer-events-auto relative hidden gap-2.5 min-[900px]:flex">
          {LINKS.map(([label, href], i) => (
            <span key={href} className="flex gap-2.5">
              {i > 0 && <span aria-hidden>|</span>}
              <TransitionLink href={href} aria-current={active(href) ? "page" : undefined} className={`${link} ${active(href) ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}>{label}</TransitionLink>
            </span>
          ))}
        </nav>
        <span className="min-[900px]:hidden" />

        <TransitionLink href="/contact" className="pointer-events-auto relative hidden items-center gap-3.5 !text-inherit no-underline min-[900px]:flex">
          Contact
          <span aria-hidden className="grid gap-1">{[0, 1, 2].map((i) => <i key={i} className="block h-[1.5px] w-[22px] bg-petrol" />)}</span>
        </TransitionLink>

        <button
          type="button" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((o) => !o)}
          className="pointer-events-auto relative flex cursor-pointer items-center gap-3.5 border-0 bg-transparent p-0 font-[inherit] text-[11px] font-medium uppercase tracking-[.14em] text-petrol min-[900px]:hidden"
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden className="grid gap-1">
            <i className={`block h-[1.5px] w-[22px] bg-petrol transition-transform duration-500 ${open ? "translate-y-[5.5px] rotate-45" : ""}`} />
            <i className={`block h-[1.5px] w-[22px] bg-petrol transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <i className={`block h-[1.5px] w-[22px] bg-petrol transition-transform duration-500 ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </header>

      <div id="site-menu" ref={menu} style={{ visibility: "hidden" }} className="fixed inset-0 z-[55] flex flex-col justify-center bg-white px-[3vw] min-[900px]:hidden">
        <ul className="m-0 grid list-none gap-2 p-0">
          {[...LINKS, ["Contact", "/contact"] as const].map(([label, href], i) => (
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
      </div>
    </>
  );
}
