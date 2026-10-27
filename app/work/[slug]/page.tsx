import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Motion from "@/components/Motion";
import PageHero from "@/components/PageHero";
import Sheet from "@/components/Sheet";
import Ph from "@/components/Ph";
import Contact from "@/components/Contact";
import TransitionLink from "@/components/TransitionLink";
import Image from "next/image";
import { projects, categoryLabel, visual } from "@/content/projects";
import { images } from "@/content/images";

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.title} — Work`, description: p.description, openGraph: p.cover ? { images: [p.cover.src] } : undefined } : {};
}

const TODO = "Add in project data";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i], v = visual(p, i);
  const next = projects[(i + 1) % projects.length], nv = visual(next, (i + 1) % projects.length);

  const meta: [string, string][] = [
    ["Category", categoryLabel(p.category)],
    ["Role", p.role ?? TODO],
    ["Deliverables", p.deliverables?.join(", ") ?? TODO],
  ];

  return (
    <Motion>
      <PageHero eyebrow={`${String(i + 1).padStart(2, "0")} — ${categoryLabel(p.category)}`} lines={p.title.split(" ")} intro={p.description} />

      <Sheet style={{ padding: "16vh 3vw 14vh" }}>
        <dl data-fx="stagger" className="m-0 mb-[10vh] grid gap-8 border-t border-mist-line pt-7" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
          {meta.map(([k, val]) => (
            <div key={k} data-item>
              <dt className="mb-2.5 font-sans text-xs font-bold uppercase tracking-[.14em]">{k}</dt>
              <dd className="m-0 font-sans text-sm leading-[1.7] text-ink-3">{val}</dd>
            </div>
          ))}
        </dl>

        {/* cover: the frame opens up and the picture settles as you arrive */}
        <Ph img={p.cover} label="Cover · drop image or video" ratio="16/9" c1={v.c1} c2={v.c2} dir="grow" end="top 20%" sizes="100vw" />

        <div className="mx-auto mt-[14vh] max-w-[1100px]">
          <p data-fx="fill" className="m-0 font-display font-medium" style={{ fontSize: "clamp(26px,3.4vw,54px)", lineHeight: 1.1, letterSpacing: "-.02em" }}>{p.description}</p>
        </div>

        <div className="mt-[14vh] grid gap-[clamp(48px,8vw,140px)]">
          {(p.sections?.length ? p.sections : [{ heading: "The brief", body: "Add case-study sections (heading + body) in the project data file." }]).map((s, k) => (
            <div key={s.heading} className="grid items-start gap-6 border-t border-mist-line pt-7 md:grid-cols-[1fr_2fr]">
              <h2 data-fx="words" className="m-0 font-display font-semibold" style={{ fontSize: "clamp(28px,3vw,48px)", lineHeight: 1, letterSpacing: "-.02em" }}>{s.heading}</h2>
              <div>
                <span className="mb-4 block font-sans text-xs font-medium tracking-[.14em] text-teal">{String(k + 1).padStart(2, "0")}</span>
                <p data-fx="rise" className="m-0 max-w-[620px] font-sans text-ink-2" style={{ fontSize: "clamp(15px,1.2vw,18px)", lineHeight: 1.7 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* gallery */}
        <div className="mt-[16vh] grid gap-[2vw] md:grid-cols-12">
          <div className="md:col-span-7"><Ph img={p.gallery?.[0]} label="Gallery · drop image" ratio="4/5" c1="#e2ebe7" c2="#d6e2dd" dir="l" sizes="(min-width: 768px) 58vw, 100vw" /></div>
          <div className="grid gap-[2vw] md:col-span-5 md:pt-[14vh]">
            <Ph img={p.gallery?.[1]} label="Gallery · drop image" ratio="1/1" c1="#D8E69A" c2="#cbd98b" dir="r" sizes="(min-width: 768px) 40vw, 100vw" />
            <div className="relative">
              <Ph img={p.gallery?.[2] ?? images.videoPoster} label="Video · drop file" ratio="16/10" dir="u" sizes="(min-width: 768px) 40vw, 100vw" />
              <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90"><i className="ml-1 block h-0 w-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-petrol" /></span>
              </span>
            </div>
          </div>
        </div>

        {!!p.results?.length && (
          <div className="mt-[16vh] border-t border-mist-line pt-7">
            <h2 className="m-0 mb-8 font-sans text-xs font-bold uppercase tracking-[.14em]">Results</h2>
            <ul data-fx="stagger" className="m-0 grid list-none gap-4 p-0">
              {p.results.map((r) => <li key={r} data-item className="font-display text-[clamp(24px,2.6vw,42px)] font-medium leading-[1.1] tracking-[-.015em]">{r}</li>)}
            </ul>
          </div>
        )}

        {!!p.links?.length && (
          <div className="mt-[10vh] flex flex-wrap gap-3">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" data-mag className="inline-block rounded-full border border-teal px-6 py-[13px] font-sans text-[13px] font-bold !text-teal no-underline hover:bg-mist">{l.label} ↗</a>
            ))}
          </div>
        )}
      </Sheet>

      {/* next project */}
      <Sheet style={{ padding: "14vh 3vw 16vh" }}>
        <TransitionLink href={`/work/${next.slug}`} className="group block !text-petrol no-underline">
          <span data-fx="rise" className="mb-6 block font-sans text-xs font-medium uppercase tracking-[.14em] text-ink-3">Next project</span>
          <div className="grid items-end gap-[3vw] md:grid-cols-[2fr_1fr]">
            <h2 data-fx="words" className="m-0 font-display font-semibold transition-colors duration-500 group-hover:!text-teal" style={{ fontSize: "clamp(48px,9vw,150px)", lineHeight: 0.88, letterSpacing: "-.03em" }}>{next.title}</h2>
            <Ph img={nv.img} label={nv.media} ratio="4/3" c1={nv.c1} c2={nv.c2} dir="circle" sizes="(min-width: 768px) 33vw, 100vw" />
          </div>
          <div data-fx="line" className="mt-10 h-[3px] bg-teal" />
        </TransitionLink>
      </Sheet>
      <Contact />
    </Motion>
  );
}
