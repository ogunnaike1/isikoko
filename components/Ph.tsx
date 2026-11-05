import Image from "next/image";
import type { Img } from "@/content/images";

/** Image frame with clip-path reveal + inner parallax. */
export default function Ph({
  img, ratio = "4/5", dir = "l", className = "", end, sizes = "(min-width: 900px) 50vw, 100vw", priority,
}: { img?: Img; ratio?: string; dir?: "l" | "r" | "u" | "circle" | "grow"; className?: string; end?: string; sizes?: string; priority?: boolean }) {
  return (
    <div data-fx="clip" data-dir={dir} data-end={end} className={`relative overflow-hidden bg-mist ${className}`} style={{ aspectRatio: ratio }}>
      <div data-par className="absolute" style={{ inset: "-8%" }}>
        {img && <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: img.pos }} />}
      </div>
    </div>
  );
}
