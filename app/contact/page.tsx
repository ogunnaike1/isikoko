import type { Metadata } from "next";
import Motion from "@/components/Motion";
import PageHero from "@/components/PageHero";
import Sheet from "@/components/Sheet";
import ContactForm from "@/components/ContactForm";
import Ph from "@/components/Ph";
import { images } from "@/content/images";
import Wordmark from "@/components/Wordmark";
import { site } from "@/content/site";
import { contactPage as c } from "@/content/pages";

export const metadata: Metadata = { title: "Contact — Digital Content & Marketing Specialist", description: c.intro };

export default function ContactPage() {
  const rows: [string, string, string?][] = [
    ["Email", site.email, site.email && `mailto:${site.email}`],
    ["LinkedIn", site.linkedin, site.linkedin],
    ["Location", site.location],
  ];
  return (
    <Motion>
      <PageHero eyebrow={c.eyebrow} lines={c.lines} intro={c.intro} accentLast />

      <Sheet id="form" style={{ padding: "18vh 3vw 6vh" }}>
        <div className="grid items-start gap-[clamp(40px,8vw,140px)] md:grid-cols-[2fr_3fr]">
          <div className="md:sticky md:top-[16vh]">
            <h2 data-fx="words" className="m-0 font-display font-medium" style={{ fontSize: "clamp(24px,2.6vw,42px)", lineHeight: 1.08, letterSpacing: "-.015em" }}>
              Have a brand to grow? Let&apos;s make content people remember.
            </h2>
            <div data-fx="line" className="my-9 h-px bg-mist-line" />
            <ul data-fx="stagger" className="m-0 grid list-none gap-3.5 p-0 font-sans text-xs font-medium uppercase tracking-[.1em] text-ink-2">
              {rows.map(([k, val, href]) => (
                <li key={k} data-item>{k} — {val ? (href ? <a href={href}>{val}</a> : val) : "add in site config"}</li>
              ))}
            </ul>
            <Ph img={images.serviceInfluencer} ratio="4/3" dir="l" className="mt-10 hidden max-w-[460px] md:block" sizes="30vw" />
          </div>
          <div data-fx="rise" data-y="60"><ContactForm /></div>
        </div>

        <div className="relative mt-[18vh]">
          <div className="mb-[14px] flex justify-between font-sans text-[11px] font-medium tracking-[.1em]">
            <span>Strategy</span><span style={{ marginLeft: "18vw" }}>Content</span><span>Results</span>
          </div>
          <Wordmark text="CONNECT" />
        </div>
      </Sheet>
    </Motion>
  );
}
