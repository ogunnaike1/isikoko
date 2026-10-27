import { images, type Img } from "./images";

export type Category =
  | "Social Media Management & Content Strategy"
  | "Video Editing & Content Production"
  | "Influencer Marketing"
  | "Marketing & Campaign Projects";

export interface Project {
  slug: string;
  title: string;
  category: Category;
  description: string;
  featured?: boolean;
  thumbnail?: string;     // /public path; omit to show a labelled placeholder
  cover?: Img;
  videos?: { src: string; poster?: string }[];
  gallery?: Img[];
  role?: string;
  deliverables?: string[];
  results?: string[];     // ONLY verified results
  links?: { label: string; href: string }[];
  sections?: { heading: string; body: string }[];
  // homepage card layout (visual only)
  card?: { col: string; ratio: string; offset?: string; c1: string; c2: string; media: string; cat: string };
}

/** Add / edit / remove projects here. The homepage shows the first 3 non-featured-hero entries below. */
export const projects: Project[] = [
  { slug: "project-one", title: "Project One", category: "Social Media Management & Content Strategy", description: "Placeholder — replace with a real project.", featured: true,
    cover: images.projectOne, gallery: [images.galleryE, images.galleryC, images.galleryD] },
  { slug: "project-two", title: "Project Two", category: "Video Editing & Content Production", description: "Placeholder.",
    cover: images.projectTwo, gallery: [images.galleryD, images.galleryB, images.galleryC],
    card: { col: "span 5", ratio: "4/5", c1: "#EAF0ED", c2: "#dfe8e4", media: "Placeholder · video", cat: "Video & Production" } },
  { slug: "project-three", title: "Project Three", category: "Influencer Marketing", description: "Placeholder.",
    cover: images.projectThree, gallery: [images.galleryA, images.galleryE, images.galleryB],
    card: { col: "7 / span 6", ratio: "16/11", offset: "14vh", c1: "#e2ebe7", c2: "#d6e2dd", media: "Placeholder · gallery", cat: "Influencer Marketing" } },
  { slug: "project-four", title: "Project Four", category: "Marketing & Campaign Projects", description: "Placeholder.",
    cover: images.projectFour, gallery: [images.galleryE, images.galleryC, images.galleryA],
    card: { col: "2 / span 8", ratio: "16/10", c1: "#D8E69A", c2: "#cbd98b", media: "Placeholder · campaign visual", cat: "Marketing & Campaigns" } },
];

export const homeCards = projects.filter((p) => p.card);

export const categories: { key: Category; label: string }[] = [
  { key: "Social Media Management & Content Strategy", label: "Social Media" },
  { key: "Video Editing & Content Production", label: "Video" },
  { key: "Influencer Marketing", label: "Influencer" },
  { key: "Marketing & Campaign Projects", label: "Campaigns" },
];
export const categoryLabel = (c: Category) => categories.find((x) => x.key === c)?.label ?? c;

const RATIOS = ["4/5", "16/11", "1/1", "16/10"];
const PALETTE = [["#EAF0ED", "#dfe8e4"], ["#e2ebe7", "#d6e2dd"], ["#D8E69A", "#cbd98b"]];

/** Placeholder look for a project (uses the homepage card values when set). */
export const visual = (p: Project, i: number) => ({
  img: p.cover,
  ratio: p.card?.ratio ?? RATIOS[i % RATIOS.length],
  c1: p.card?.c1 ?? PALETTE[i % PALETTE.length][0],
  c2: p.card?.c2 ?? PALETTE[i % PALETTE.length][1],
  media: p.card?.media ?? "Placeholder · cover",
});
