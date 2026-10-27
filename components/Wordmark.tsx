/** Big letter-by-letter wordmark; swept in by data-fx="wordmark". */
export default function Wordmark({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div data-fx="wordmark" aria-label={text} className={`flex whitespace-nowrap font-display font-semibold text-petrol ${className}`} style={{ fontSize: "min(16vw,32vh)", lineHeight: 0.8, letterSpacing: ".015em" }}>
      {text.toUpperCase().split("").map((c, i) => (
        <span key={i} aria-hidden className="block overflow-hidden" style={{ padding: ".05em 0 .02em" }}><span data-wl className="block">{c}</span></span>
      ))}
    </div>
  );
}
