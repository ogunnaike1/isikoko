"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, reduced } from "@/lib/gsap";
import { runFx } from "@/lib/fx";
import { useMagnetic } from "@/lib/useMagnetic";

/** Wraps a page; applies every data-fx effect inside it and cleans up on unmount. */
export default function Motion({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useMagnetic(ref);

  useEffect(() => {
    let cleanup = () => {};
    const ctx = gsap.context(() => { cleanup = runFx(ref.current!, reduced()); }, ref);
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => { cleanup(); ctx.revert(); };
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
