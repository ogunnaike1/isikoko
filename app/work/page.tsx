import type { Metadata } from "next";
import Motion from "@/components/Motion";
import PageHero from "@/components/PageHero";
import Sheet from "@/components/Sheet";
import WorkGrid from "@/components/WorkGrid";
import Contact from "@/components/Contact";
import { projects } from "@/content/projects";
import { workPage as c } from "@/content/pages";

export const metadata: Metadata = { title: "Work — Digital Content & Marketing Specialist", description: c.intro };

export default function WorkPage() {
  return (
    <Motion>
      <PageHero eyebrow={c.eyebrow} lines={c.lines} intro={c.intro} accentLast />
      <Sheet style={{ padding: "18vh 3vw 16vh" }}>
        <WorkGrid items={projects} />
      </Sheet>
      <Contact />
    </Motion>
  );
}
