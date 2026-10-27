/** Sticky page hero — following sheets rise over it (see data-fx="hero" in lib/fx.ts). */
export default function PageHero({
  eyebrow, lines, intro, accentLast = false,
}: { eyebrow: string; lines: string[]; intro?: string; accentLast?: boolean }) {
  return (
    <section data-fx="hero" className="sticky top-0 flex h-[100svh] flex-col justify-end overflow-hidden bg-white" style={{ padding: "0 3vw 8vh" }}>
      <div data-hmeta className="mb-[3vh] flex items-center gap-3 font-sans text-xs font-medium uppercase tracking-[.14em] text-ink-3">
        <span className="h-px w-10 bg-teal" />{eyebrow}
      </div>
      <h1 data-htitle className="m-0 font-display font-semibold" style={{ fontSize: "clamp(44px,10vw,180px)", lineHeight: 0.88, letterSpacing: "-.035em" }}>
        {lines.map((l, i) => (
          <span key={l} className="block overflow-hidden" style={{ padding: ".04em 0 .08em" }}>
            <span data-line className={`block ${accentLast && i === lines.length - 1 ? "text-teal" : ""}`}>{l}</span>
          </span>
        ))}
      </h1>
      <div className="mt-[5vh] flex items-end justify-between gap-6">
        {intro ? <p data-hmeta className="m-0 max-w-[440px] font-sans text-ink-2" style={{ fontSize: "clamp(14px,1.1vw,17px)", lineHeight: 1.6 }}>{intro}</p> : <span />}
        <span data-hmeta className="hidden items-center gap-3 font-sans text-[11px] font-medium uppercase tracking-[.14em] text-petrol sm:flex">
          Scroll
          <span className="relative block h-10 w-px overflow-hidden bg-mist-line">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[cue_1.8s_cubic-bezier(.65,0,.35,1)_infinite] bg-petrol" />
          </span>
        </span>
      </div>
    </section>
  );
}
