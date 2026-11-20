import { images, still, video, type Img } from "./images";

export type Category =
  | "Social Media Management & Content Strategy"
  | "Video Editing & Content Production"
  | "Influencer Campaigns";

export interface Project {
  slug: string;
  title: string;
  category: Category;
  description: string;
  featured?: boolean;
  cover?: Img;
  videos?: { src: string; poster?: string; ratio?: string; caption?: string }[];
  gallery?: Img[];
  role?: string;
  deliverables?: string[];
  results?: string[];     // ONLY verified results
  links?: { label: string; href: string }[];
  sections?: { heading: string; body: string }[];
  // homepage card layout (visual only)
  card?: { col: string; ratio: string; offset?: string; cat: string };
}

/** Add / edit / remove projects here. `featured` plays in the homepage hero; projects with a `card` appear in the homepage grid. */
export const projects: Project[] = [
  { slug: "monosend-social-media", title: "Monosend Content & Social Media", category: "Social Media Management & Content Strategy",
    description: "Took over Monosend's social media accounts and managed X, Snapchat and LinkedIn, then reported on performance across all three.",
    role: "Content operations & social media manager, Monosend Tech Ltd (South Africa, Sept 2025 – present)",
    deliverables: ["X (Twitter) management", "Snapchat Stories", "Daily LinkedIn posting", "Scheduling, publishing and campaign execution", "Engagement and customer communication", "Documentation, task tracking and cross-team coordination", "Performance report"],
    sections: [
      { heading: "The takeover", body: "I took over Monosend's social media accounts and managed X (Twitter), Snapchat and LinkedIn, including daily posting on LinkedIn." },
      { heading: "X (Twitter)", body: "The strongest channel. Over the full period I managed it, 1 June to 29 October 2026 (about five months), roughly 1 in 5 impressions turned into an engagement and the account grew to 1.7K followers." },
      { heading: "Snapchat and LinkedIn", body: "Snapchat only provides the last three months of analytics (August to October 2026) and LinkedIn only the last month (28 September to 27 October 2026), so these results show the data available, not the full period. LinkedIn now has a daily-posting baseline to build on." },
      { heading: "The report", body: "I wrapped it up in a social media performance report dated 29 October 2026, covering each platform's period and headline results." },
    ],
    results: [
      "X: 21.2K impressions, 4.2K engagements, 19.8% engagement rate, 1.7K followers (Jun 1 – Oct 29, 2026)",
      "Snapchat: Story views up 85.8% and total view time up 116.9%, with 73% of views from non-followers (Aug – Oct 2026)",
      "LinkedIn: 769 organic impressions and 13 reactions, posting daily (Sep 28 – Oct 27, 2026)",
      "Improved team efficiency by 40% through structured workflow systems",
      "Improved posting consistency by 65%",
      "Streamlined reporting and task tracking across departments",
    ],
    cover: images.monosendReport, gallery: [images.xAnalytics],
    card: { col: "1 / span 7", ratio: "16/11", cat: "Social Media" } },
  { slug: "youtube-video-edits", title: "YouTube Video Edits", category: "Video Editing & Content Production",
    description: "Vertical videos edited for a YouTuber.",
    role: "Video editor",
    deliverables: ["Video editing"],
    featured: true,
    videos: [video("youtuber1"), video("youtuber2"), video("youtuber3"), video("youtuber4")],
    cover: still("youtuber1", "Still from a vertical video edited for a YouTuber", "50% 40%") },
  { slug: "influencer-campaigns", title: "Influencer Campaigns", category: "Influencer Campaigns",
    description: "Influencer campaigns for Monosend and for ProtonLabs' Detect.ai: outreach, briefs and a creator agreement, ending in short creator videos.",
    role: "Influencer outreach & campaign coordination",
    deliverables: ["Creator outreach", "Campaign briefs", "Creator contract and agreement"],
    sections: [
      { heading: "Monosend: the brief", body: "Monosend is a financial app for moving money between South Africa and Nigeria. The goal was a short, natural explainer from a creator showing what users can do with it: send money between the two countries and locally, exchange currency, pay utility bills, buy airtime and data, use a virtual USD card with Apple Pay and Google Pay, and convert USDT to Rands." },
      { heading: "Monosend: the ask", body: "One vertical (9:16) video of 30–60 seconds with a strong hook, a clear explanation of the key features and a clear mention of Monosend, posted on the creator's page and reused on Monosend's TikTok, Instagram and Snapchat. I sent a personalised outreach email with the campaign brief attached, inviting the creator to a call about details, timeline and compensation." },
      { heading: "Detect.ai: the brief", body: "For ProtonLabs Technology Inc, one TikTok video promoting Detect.ai that clearly shows how the product works or solves a real-world problem, in the creator's own style and in line with the brand's values: clear, authentic, helpful and ethical." },
      { heading: "Detect.ai: the agreement", body: "I prepared the creator contract and agreement: a 30–90 second, 9:16 video with a strong hook in the first three seconds and subtitles and/or trending audio, delivered on time, with openness to feedback and one round of revisions, and a payment structure that rewards performance. Then I reached out to the influencer and took them through it." },
    ],
    videos: [{ ...video("monosendCreator"), caption: "Monosend" }, { ...video("detectai"), caption: "Detect.ai" }],
    cover: still("monosendCreator", "Creator explaining how Monosend works in a TikTok video", "50% 40%"),
    card: { col: "9 / span 4", ratio: "4/5", cat: "Influencer Campaigns" } },
  { slug: "protonlabs-operations", title: "Protonlabs Campaign Operations", category: "Influencer Campaigns",
    description: "Coordinated influencer and partnership campaigns between internal teams and 80+ external creators across multiple regions.",
    role: "Content operations & campaign specialist, Protonlabs (United Kingdom, Nov 2023 – Oct 2025)",
    deliverables: ["Creator onboarding and briefing", "Scheduling and documentation", "Delivery tracking", "Campaign trackers and workflows"],
    sections: [
      { heading: "The work", body: "I managed onboarding, briefing, scheduling, documentation and delivery tracking for campaign execution, and supported content planning and social media campaign execution across multiple platforms." },
      { heading: "Systems", body: "I maintained structured campaign tracking systems and communication workflows, and kept content output aligned with brand communication standards." },
    ],
    results: [
      "Increased website traffic by 75% through influencer-driven campaigns",
      "Reduced influencer onboarding time by 50% through streamlined coordination",
      "Improved on-time delivery of deliverables by 85% across active campaigns",
      "Supported consistent publishing of 45–60 posts a month",
    ],
    links: [{ label: "Watch a campaign video", href: "https://vt.tiktok.com/ZSD3Lx7Fd/" }] },
  { slug: "bolanles-closet", title: "Bolanle’s Closet", category: "Social Media Management & Content Strategy",
    description: "Social media content and customer experience for a UK fashion and e-commerce brand.",
    role: "Content & customer experience coordinator, Bolanle’s Closet (United Kingdom, Mar – Dec 2025)",
    deliverables: ["Content creation, scheduling and publishing on Instagram and X", "Customer communication and order tracking", "Payment follow-ups", "Transaction records"],
    sections: [
      { heading: "The work", body: "I managed content creation, scheduling and publishing across Instagram and X, applied content strategies to grow organic engagement and audience, and kept a consistent brand tone across customer-facing channels." },
      { heading: "Customers", body: "I handled customer communication, order tracking and payment follow-ups, and organised transaction records and documentation." },
    ],
    results: [
      "Increased engagement by 65% across social media platforms",
      "95% customer satisfaction rate through improved communication systems",
      "Improved data accuracy by 95% through organised records",
    ],
  },
  { slug: "dermerah-aesthetics", title: "Dermérah Aesthetics & Co.", category: "Social Media Management & Content Strategy",
    description: "Brand and sales support for a skincare and aesthetics brand: digital visibility, content, customer engagement and business growth.",
    role: "Sales & Brand Officer, Dermérah Aesthetics & Co. (Oct 2026 – present)",
    deliverables: ["Brand communications", "Content planning and visual editing", "Social media publishing", "Sales support and lead management", "Customer engagement"],
    sections: [
      { heading: "Project overview", body: "Dermérah Aesthetics & Co. is a skincare and aesthetics brand offering skincare products, professional consultations and treatments, including facials, massages and waxing. I joined the brand as a Sales & Brand Officer in October 2026, supporting its brand visibility, digital presence, customer engagement and business growth." },
      { heading: "My responsibilities", body: "Brand communications, content planning, visual editing, social media publishing, sales support, lead management and customer engagement." },
      { heading: "Content planning", body: "I build the brand's weekly content calendar. In a sample week (23 to 29 November 2026) I planned 11 posts across five content pillars (personal-voice Reels, the shop, clinic education, skincare education and community) in four formats: Reels, a carousel, a motion graphic Reel and static graphics. Every post has a pillar, format, content direction, talking points or slide and animation breakdown, visual direction and a call to action, with reference links for the shoot concepts. The plan ends with a production brief listing the seven videos and assets to be filmed or made, due before the publishing week starts." },
      { heading: "Social media growth", body: "Between 18 October and 18 November 2026, the Instagram account's views over the last 30 days rose from 2.4K to 14.8K, while followers grew from 406 to 415 and the page published 41 new posts. The profile was also updated from a general skincare page to a Medical Esthetics Clinic with a booking link." },
    ],
    results: [
      "Instagram views in the last 30 days: 2.4K to 14.8K, about 6x (Oct 18 to Nov 18, 2026)",
      "Followers: 406 to 415, with 41 new posts published (257 to 298)",
    ],
    videos: [{ ...video("dermerahEdit1"), caption: "Video edit for Dermérah" }, { ...video("dermerahPost1"), caption: "Published Dermérah content" }],
    cover: images.dermerahNov18, gallery: [images.dermerahOct18, images.dermerahNov18] },
  { slug: "ai-video-content", title: "AI Video Content", category: "Video Editing & Content Production",
    description: "AI-generated and edited short-form videos for social media: financial education, trend-based storytelling and brand communication.",
    role: "AI video content creator, Monosend",
    deliverables: ["AI video generation and storytelling", "Ideation and scripting support", "Video editing and formatting", "Educational and brand communication content"],
    sections: [
      { heading: "Financial and educational", body: "Short-form videos that simplify financial topics, money tips and educational concepts for social media audiences." },
      { heading: "Engagement and trends", body: "Content designed to increase engagement around travel, rankings, lifestyle insights and global trends." },
      { heading: "Brand communication", body: "Videos that explain company services, products and brand messaging." },
    ],
    videos: [{ ...video("aiVideo1"), caption: "AI video 01" }, { ...video("aiVideo2"), caption: "AI video 02" }, { ...video("aiVideo3"), caption: "AI video 03" }, { ...video("aiVideo4"), caption: "AI video 04" }],
    cover: still("aiVideo1", "Frame from an AI-generated short-form video", "50% 30%"),
    results: [] },
];

const HOME_ORDER = ["monosend-social-media", "influencer-campaigns"];
export const homeCards = HOME_ORDER.map((s) => projects.find((p) => p.slug === s)!).filter((p) => p?.card);
export const featuredProject = projects.find((p) => p.featured)!;

export const categories: { key: Category; label: string }[] = [
  { key: "Social Media Management & Content Strategy", label: "Social Media" },
  { key: "Video Editing & Content Production", label: "Video" },
  { key: "Influencer Campaigns", label: "Influencer Campaigns" },
];
export const categoryLabel = (c: Category) => categories.find((x) => x.key === c)?.label ?? c;

/** Cover and aspect ratio for a project (uses the homepage card ratio when set). */
export const visual = (p: Project) => ({ img: p.cover, ratio: p.card?.ratio ?? "4/5" });
