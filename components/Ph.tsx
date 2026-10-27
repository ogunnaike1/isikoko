import Image from "next/image";
import type { Img } from "@/content/images";

/** Photo frame with clip-path reveal + inner parallax. Without `img` it falls back to a labelled striped placeholder. */
export default function Ph({
  img, label, ratio = "4/5", c1 = "#EAF0ED", c2 = "#dfe8e4", dir = "l", className = "", end, sizes = "(min-width: 900px) 50vw, 100vw", priority,
}: { img?: Img; label?: string; ratio?: string; c1?: string; c2?: string; dir?: "l" | "r" | "u" | "circle" | "grow"; className?: string; end?: string; sizes?: string; priority?: boolean }) {
  return (
    <div data-fx="clip" data-dir={dir} data-end={end} className={`relative overflow-hidden bg-mist ${className}`} style={{ aspectRatio: ratio }}>
      <div data-par className="absolute" style={{ inset: "-8%", background: img ? undefined : `repeating-linear-gradient(135deg,${c1} 0 12px,${c2} 12px 24px)` }}>
        {img && <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: img.pos }} />}
      </div>
      {!img && label && <span className="absolute bottom-3.5 left-4 font-sans text-[10px] font-medium uppercase tracking-[.14em] text-ink-3">{label}</span>}
    </div>
  );
}
