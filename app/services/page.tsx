import type { Metadata } from "next";
import Motion from "@/components/Motion";
import PageHero from "@/components/PageHero";
import Sheet from "@/components/Sheet";
import Ph from "@/components/Ph";
import ServiceArt from "@/components/ServiceArt";
import Contact from "@/components/Contact";
import { services } from "@/content/services";
import { servicesPage as c, process } from "@/content/pages";

export const metadata: Metadata = { title: "Services — Digital Content & Marketing Specialist", description: c.intro };

const Ticker = ({ dir, outline = false }: { dir: "l" | "r"; outline?: boolean }) => {
  const row = (k: number) => c.marquee.map((t) => (
    <span key={`${k}-${t}`} className="flex items-center gap-[3vw] pr-[3vw]">
      <span className={outline ? "text-transparent [-webkit-text-stroke:1.5px_#182C31]" : "text-petrol"}>{t}</span>
      <i aria-hidden className="block h-3 w-3 shrink-0 rounded-full bg-teal" />
    </span>
  ));
  return (
    <div data-fx="marquee" data-dir={dir} data-speed={dir === "l" ? 45 : 55} className="overflow-hidden py-[1vh]" aria-hidden>
      <div data-track className="flex w-max whitespace-nowrap font-display font-semibold" style={{ fontSize: "clamp(48px,8vw,128px)", lineHeight: 1, letterSpacing: "-.03em" }}>
        {row(0)}{row(1)}
      </div>
    </div>
  );
};

export default function ServicesPage() {
  return (
    <Motion>
      <PageHero eyebrow={c.eyebrow} lines={c.lines} intro={c.intro} accentLast />

      <Sheet style={{ padding: "16vh 0 14vh" }}>
        <Ticker dir="l" />
        <Ticker dir="r" outline />

        <div className="mx-auto mt-[16vh] px-[3vw]" style={{ maxWidth: 1240 }}>
          <p data-fx="fill" className="m-0 font-display font-medium" style={{ fontSize: "clamp(28px,4vw,64px)", lineHeight: 1.06, letterSpacing: "-.02em" }}>{c.statement}</p>
        </div>

        <div className="mt-[16vh] grid gap-[18vh] px-[3vw]">
          {services.map((s, i) => (
            <article key={s.n} className="grid items-center gap-[clamp(28px,6vw,110px)] md:grid-cols-2">
              <div className={i % 2 ? "md:order-2" : ""}>
                <div className="relative">
                  <Ph img={s.img} ratio="5/4" dir="circle" end="top 30%" />
                  <div className="absolute -bottom-[7%] left-[5%] w-[34%] overflow-hidden border-[5px] border-white shadow-none" style={{ aspectRatio: "1" }}><ServiceArt i={i} /></div>
                </div>
              </div>
              <div>
                <span data-fx="rise" className="font-sans text-xs font-medium tracking-[.14em] text-teal">{s.n} / 05</span>
                <h2 data-fx="words" className="mb-5 mt-3 font-display font-semibold" style={{ fontSize: "clamp(32px,4.6vw,76px)", lineHeight: 0.98, letterSpacing: "-.025em" }}>{s.name}</h2>
                <div data-fx="line" className="mb-6 h-px bg-mist-line" />
                <p data-fx="rise" className="m-0 mb-7 max-w-[480px] font-sans text-ink-2" style={{ fontSize: "clamp(15px,1.2vw,18px)", lineHeight: 1.6 }}>{s.desc}</p>
                <div data-fx="stagger" className="flex flex-wrap gap-2">
                  {s.tags.map((t) => <span key={t} data-item className="rounded-full border border-mist-line px-3.5 py-[7px] font-sans text-xs font-medium text-petrol transition-colors hover:border-teal hover:bg-teal hover:text-white">{t}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Sheet>

      {/* process — pinned horizontal scroll on desktop, stacked on mobile */}
      <Sheet style={{ padding: 0 }} className="overflow-clip">
        <section data-fx="hscroll" className="relative flex flex-col justify-center min-[900px]:h-screen">
          <div className="px-[3vw] pb-[4vh] pt-[14vh] min-[900px]:pt-0">
            <span className="font-sans text-xs font-medium uppercase tracking-[.14em] text-ink-3">How it works</span>
            <h2 data-fx="words" className="mb-0 mt-3 font-display font-semibold" style={{ fontSize: "clamp(48px,9vw,150px)", lineHeight: 0.88, letterSpacing: "-.03em" }}>From brief to published.</h2>
          </div>
          <div data-track className="flex w-max max-w-full flex-col gap-10 px-[3vw] pb-[10vh] min-[900px]:max-w-none min-[900px]:flex-row min-[900px]:gap-[4vw] min-[900px]:pb-0 min-[900px]:pr-[12vw]">
            {process.map((s) => (
              <div key={s.n} data-hpanel className="relative flex shrink-0 flex-col justify-between border-t border-mist-line pt-6 min-[900px]:h-[46vh] min-[900px]:w-[30vw] min-[900px]:min-w-[360px]">
                <span data-hnum className="font-display font-semibold text-mist-deep" style={{ fontSize: "clamp(90px,14vw,230px)", lineHeight: 0.8, letterSpacing: "-.04em" }}>{s.n}</span>
                <div>
                  <div className="overflow-hidden"><h3 data-hline className="m-0 font-display font-semibold" style={{ fontSize: "clamp(32px,3.6vw,60px)", lineHeight: 1, letterSpacing: "-.025em" }}>{s.name}</h3></div>
                  <p className="mb-0 mt-4 max-w-[360px] font-sans text-ink-2" style={{ fontSize: "clamp(14px,1.1vw,17px)", lineHeight: 1.6 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-x-[3vw] bottom-[6vh] hidden h-[3px] bg-mist min-[900px]:block"><div data-hbar className="h-full origin-left bg-teal" /></div>
        </section>
      </Sheet>

      <Sheet style={{ padding: "16vh 3vw 14vh" }}>
        <div className="grid items-end gap-8 md:grid-cols-[1fr_2fr]">
          <h2 data-fx="words" className="m-0 font-display font-semibold" style={{ fontSize: "clamp(32px,4vw,64px)", lineHeight: 1, letterSpacing: "-.025em" }}>Also strong in</h2>
          <div data-fx="stagger" className="flex flex-wrap gap-3">
            {c.also.map((t) => <span key={t} data-item className="rounded-full border border-petrol px-6 py-3 font-sans text-sm font-medium">{t}</span>)}
          </div>
        </div>
      </Sheet>
      <Contact />
    </Motion>
  );
}
