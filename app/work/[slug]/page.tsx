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

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.title} — Work`, description: p.description, openGraph: p.cover ? { images: [p.cover.src] } : undefined } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length], nv = visual(next);

  const meta: [string, string][] = [
    ["Category", categoryLabel(p.category)],
    ["Role", p.role ?? ""],
    ["Deliverables", p.deliverables?.join(", ") ?? ""],
  ].filter(([, val]) => val) as [string, string][];

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
        {p.cover && p.cover.w > p.cover.h && <Ph img={p.cover} ratio={`${p.cover.w}/${p.cover.h}`} dir="grow" end="top 20%" sizes="100vw" />}

        <div className="mx-auto mt-[14vh] max-w-[1100px]">
          <p data-fx="fill" className="m-0 font-display font-medium" style={{ fontSize: "clamp(26px,3.4vw,54px)", lineHeight: 1.1, letterSpacing: "-.02em" }}>{p.description}</p>
        </div>

        <div className="mt-[14vh] grid gap-[clamp(48px,8vw,140px)]">
          {(p.sections ?? []).map((s, k) => (
            <div key={s.heading} className="grid items-start gap-6 border-t border-mist-line pt-7 md:grid-cols-[1fr_2fr]">
              <h2 data-fx="words" className="m-0 font-display font-semibold" style={{ fontSize: "clamp(28px,3vw,48px)", lineHeight: 1, letterSpacing: "-.02em" }}>{s.heading}</h2>
              <div>
                <span className="mb-4 block font-sans text-xs font-medium tracking-[.14em] text-teal">{String(k + 1).padStart(2, "0")}</span>
                <p data-fx="rise" className="m-0 max-w-[620px] font-sans text-ink-2" style={{ fontSize: "clamp(15px,1.2vw,18px)", lineHeight: 1.7 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        {!!p.videos?.length && (
          <div className="mt-[16vh] border-t border-mist-line pt-7">
            <h2 className="m-0 mb-8 font-sans text-xs font-bold uppercase tracking-[.14em]">{p.videos.length > 1 ? "The videos" : "The video"}</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {p.videos.map((vd) => {
                const [w, h] = (vd.ratio ?? "9/16").split("/").map(Number);
                return (
                  <figure key={vd.src} className="m-0 w-full" style={{ maxWidth: w > h ? 820 : 340 }}>
                    <video src={vd.src} poster={vd.poster} controls playsInline preload="metadata" className="w-full rounded-2xl bg-petrol object-cover" style={{ aspectRatio: `${w}/${h}` }} />
                    {vd.caption && <figcaption className="mt-3 font-sans text-xs font-medium uppercase tracking-[.14em] text-ink-3">{vd.caption}</figcaption>}
                  </figure>
                );
              })}
            </div>
          </div>
        )}

        {!!p.gallery?.length && (
          <div className="mt-[16vh] grid items-start gap-[2vw]" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))" }}>
            {p.gallery.map((g) => (
              <Image key={g.src} src={g.src} alt={g.alt} width={g.w} height={g.h} sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full max-w-[560px] justify-self-center border border-mist-line" />
            ))}
          </div>
        )}

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
            <Ph img={nv.img} ratio="4/3" dir="circle" sizes="(min-width: 768px) 33vw, 100vw" />
          </div>
          <div data-fx="line" className="mt-10 h-[3px] bg-teal" />
        </TransitionLink>
      </Sheet>
      <Contact />
    </Motion>
  );
}
