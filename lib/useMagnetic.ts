"use client";
import { useEffect } from "react";
import { gsap } from "./gsap";

/** Magnetic hover for every [data-mag] inside `root` (fine pointers only). */
export function useMagnetic(root: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!root.current || !matchMedia("(pointer:fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const off: (() => void)[] = [];
    root.current.querySelectorAll<HTMLElement>("[data-mag]").forEach((b) => {
      const x = gsap.quickTo(b, "x", { duration: 0.5, ease: "power3" });
      const y = gsap.quickTo(b, "y", { duration: 0.5, ease: "power3" });
      const move = (e: MouseEvent) => {
        const r = b.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * 0.3);
        y((e.clientY - r.top - r.height / 2) * 0.3);
      };
      const leave = () => { x(0); y(0); };
      b.addEventListener("mousemove", move);
      b.addEventListener("mouseleave", leave);
      off.push(() => { b.removeEventListener("mousemove", move); b.removeEventListener("mouseleave", leave); });
    });
    return () => off.forEach((f) => f());
  }, [root]);
}
