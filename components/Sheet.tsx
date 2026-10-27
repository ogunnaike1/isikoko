"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * A white "sheet" with a curved top that rises over the previous scene and flattens as it covers it.
 * `backdrop` is the wrapper colour that shows in the curved corners (Deep Petrol).
 */
export default function Sheet({
  id, backdrop = "#182C31", flush, wrapStyle, className = "", style, children,
}: {
  id?: string; backdrop?: string; flush?: boolean; wrapStyle?: React.CSSProperties; className?: string; style?: React.CSSProperties; children: React.ReactNode;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const sheet = useRef<HTMLElement>(null);

  useEffect(() => {
    const h = innerHeight * 0.16;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sheet.current,
        { borderTopLeftRadius: `50% ${h}px`, borderTopRightRadius: `50% ${h}px` },
        {
          borderTopLeftRadius: "0% 0px", borderTopRightRadius: "0% 0px", ease: "none",
          scrollTrigger: { trigger: sheet.current, start: "top bottom", end: "top 15%", scrub: true, invalidateOnRefresh: true },
        }
      );
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} style={{ background: backdrop, marginTop: flush ? 0 : -1, position: "relative", ...wrapStyle }}>
      <section
        ref={sheet} id={id} className={`bg-white text-petrol ${className}`}
        style={{ borderRadius: "50% 50% 0 0 / 16vh 16vh 0 0", ...style }}
      >
        {children}
      </section>
    </div>
  );
}
