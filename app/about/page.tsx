import type { Metadata } from "next";
import Motion from "@/components/Motion";
import PageHero from "@/components/PageHero";
import Sheet from "@/components/Sheet";
import Ph from "@/components/Ph";
import Contact from "@/components/Contact";
import { images } from "@/content/images";
import { aboutPage as c } from "@/content/pages";

export const metadata: Metadata = { title: "About — Digital Content & Marketing Specialist", description: c.statement };

const Ticker = () => {
  const row = (k: number) => c.skills.map((t) => (
    <span key={`${k}-${t}`} className="flex items-center gap-[3vw] pr-[3vw]">{t}<i aria-hidden className="block h-3 w-3 shrink-0 rounded-full bg-citron" /></span>
  ));
  return (
    <div data-fx="marquee" data-speed={50} className="overflow-hidden py-[1vh]" aria-hidden>
      <div data-track className="flex w-max whitespace-nowrap font-display font-semibold text-petrol" style={{ fontSize: "clamp(40px,6.5vw,104px)", lineHeight: 1, letterSpacing: "-.03em" }}>{row(0)}{row(1)}</div>
    </div>
  );
};

export default function AboutPage() {
  return (
    <Motion>
      <PageHero eyebrow={c.eyebrow} lines={c.lines} intro={c.intro} accentLast />

      <Sheet style={{ padding: "18vh 3vw 16vh" }}>
        <div className="grid items-start gap-[clamp(28px,6vw,110px)] md:grid-cols-[minmax(280px,5fr)_7fr]">
          <div className="md:sticky md:top-[14vh]">
            <Ph img={images.aboutPortrait} label="Portrait · drop photo" ratio="4/5" dir="circle" priority={false} end="top 30%" className="w-full max-w-[520px]" />
          </div>
          <div>
            <span data-fx="rise" className="font-sans text-xs font-medium uppercase tracking-[.14em] text-ink-3">Hello</span>
            <p data-fx="fill" className="mb-0 mt-5 font-display font-medium" style={{ fontSize: "clamp(30px,4.4vw,72px)", lineHeight: 1.04, letterSpacing: "-.025em" }}>{c.statement}</p>
            <div data-fx="line" className="my-12 h-px bg-mist-line" />
            <div data-fx="stagger" className="grid gap-9" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
              {c.facts.map(([h, b]) => (
                <div key={h} data-item>
                  <h3 className="mb-2.5 mt-0 font-sans text-xs font-bold uppercase tracking-[.14em]">{h}</h3>
                  <p className="m-0 font-sans text-sm leading-[1.7] text-ink-3">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sheet>

      {/* Plan → Create → Publish: each word inks in as you reach it */}
      <Sheet style={{ padding: "14vh 3vw 12vh" }}>
        <span data-fx="rise" className="mb-[6vh] block font-sans text-xs font-medium uppercase tracking-[.14em] text-ink-3">How I work</span>
        <div className="grid gap-[10vh]">
          {c.workflow.map(([w, d], i) => (
            <div key={w} className="grid items-end gap-4 border-t border-mist-line pt-6 md:grid-cols-[3fr_2fr]">
              <h2 data-fx="fill" data-from="#e3ebe8" className="m-0 font-display font-semibold" style={{ fontSize: "clamp(72px,17vw,300px)", lineHeight: 0.84, letterSpacing: "-.04em" }}>{w}</h2>
              <p data-fx="rise" className="m-0 max-w-[380px] pb-[1vw] font-sans text-ink-2" style={{ fontSize: "clamp(14px,1.2vw,18px)", lineHeight: 1.6 }}>
                <span className="mb-3 block font-sans text-xs font-medium tracking-[.14em] text-teal">0{i + 1}</span>{d}
              </p>
            </div>
          ))}
        </div>
      </Sheet>

      <Sheet style={{ padding: "10vh 0 14vh" }}>
        <Ticker />
        <div className="mt-[12vh] grid gap-[2vw] px-[3vw] md:grid-cols-12">
          <div className="md:col-span-5 md:mt-[12vh]"><Ph img={images.aboutOne} ratio="4/5" dir="l" sizes="(min-width: 768px) 40vw, 100vw" /></div>
          <div className="md:col-span-7"><Ph img={images.aboutTwo} ratio="16/11" dir="r" sizes="(min-width: 768px) 60vw, 100vw" /></div>
        </div>
      </Sheet>
      <Contact />
    </Motion>
  );
}
