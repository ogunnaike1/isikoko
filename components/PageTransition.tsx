"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger, reduced } from "@/lib/gsap";
import { scrollToTop } from "@/lib/lenis";
import { PT_EVENT } from "@/lib/transition";

const HIDDEN = 85; // yPercent with the 160vh curtain fully below the viewport

/** Petrol curtain: rises over the page, route changes underneath, then lifts off to reveal the new page. */
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const el = useRef<HTMLDivElement>(null);
  const covered = useRef(false);
  const busy = useRef(false);
  const safety = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const exit = () => {
    clearTimeout(safety.current);
    covered.current = false;
    scrollToTop(true);
    gsap.to(el.current, {
      yPercent: -HIDDEN, duration: 0.9, delay: 0.15, ease: "power3.inOut",
      onComplete: () => { gsap.set(el.current, { yPercent: HIDDEN }); busy.current = false; ScrollTrigger.refresh(); },
    });
  };

  useEffect(() => { gsap.set(el.current, { yPercent: HIDDEN, visibility: "visible" }); }, []);

  useEffect(() => {
    const onGo = (e: Event) => {
      const href = (e as CustomEvent<string>).detail;
      const url = new URL(href, location.href);
      if (url.pathname === location.pathname) { scrollToTop(); return; }
      if (busy.current) return;
      if (reduced()) { router.push(href); return; }
      busy.current = true;
      gsap.to(el.current, {
        yPercent: 0, duration: 0.8, ease: "power3.inOut",
        onComplete: () => {
          covered.current = true;
          router.push(href);
          safety.current = setTimeout(exit, 4000); // never leave the screen covered
        },
      });
    };
    window.addEventListener(PT_EVENT, onGo);
    return () => window.removeEventListener(PT_EVENT, onGo);
  }, [router]);

  useEffect(() => { if (covered.current) exit(); }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={el} aria-hidden
      className="pointer-events-none fixed inset-x-0 z-[90] bg-petrol"
      style={{ top: "-30vh", height: "160vh", borderRadius: "50% / 30vh", visibility: "hidden" }}
    />
  );
}
