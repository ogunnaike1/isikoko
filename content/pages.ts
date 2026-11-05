// Copy for the inner pages. Edit here. Facts come from the CV, creative summary and portfolio.

export const workPage = {
  eyebrow: "Portfolio",
  lines: ["Selected", "work"],
  intro: "Operations, influencer, social and video work for Protonlabs, Monosend and Bolanle’s Closet. Filter by discipline, open a project for the full story.",
};

export const servicesPage = {
  eyebrow: "Services",
  lines: ["Five ways", "I help brands."],
  intro: "Operations, partnerships and content, coordinated and delivered end to end.",
  statement: "Every service starts with a structured system: clear trackers, clear communication and clear timelines, so campaigns ship on time.",
  marquee: ["Operations", "Influencer Marketing", "Social Media", "AI Video", "Partnerships"],
  also: ["Customer engagement", "Executive support", "Documentation & reporting"],
};

export const process = [
  { n: "01", name: "Understand", body: "Start with the brand goal, the partners involved and what success should look like." },
  { n: "02", name: "Plan", body: "Turn the goal into timelines, briefs and a tracker the whole team can see." },
  { n: "03", name: "Create", body: "Content, video and documentation produced to the plan." },
  { n: "04", name: "Publish", body: "Scheduled, delivered and tracked consistently across channels." },
  { n: "05", name: "Refine", body: "Review what is working and sharpen the next round." },
];

export const aboutPage = {
  eyebrow: "About",
  lines: ["Structure first,", "execution always."],
  intro: "Operations & partnerships manager, influencer marketing and AI video content.",
  statement: "Operations and partnerships professional supporting fast-paced digital brands across influencer marketing, campaign coordination and social media, with AI video content on the side.",
  facts: [
    ["Approach", "Build structured systems that improve execution speed, communication flow and delivery consistency."],
    ["Core", "Operations, influencer marketing and partnerships, campaign execution, social media and AI video content."],
    ["Background", "Protonlabs (UK), Monosend Tech (South Africa), Bolanle’s Closet (UK). B.Sc. Zoology, Olabisi Onabanjo University."],
  ] as [string, string][],
  workflow: [
    ["Plan", "Understand the brand goal and map timelines and content around it."],
    ["Create", "Produce the content, video and documentation the plan calls for."],
    ["Publish", "Ship it on schedule, then track delivery and look after the audience."],
  ] as [string, string][],
  skills: ["Operations", "Influencer marketing", "Campaign execution", "AI video", "Social media", "Partnerships"],
};

export const contactPage = {
  eyebrow: "Contact",
  lines: ["Let's", "talk."],
  intro: "Have a brand to grow? Tell me about it — I'll come back with a plan.",
  services: ["Operations & Partnerships", "Influencer Marketing", "Social Media & Content", "AI Video & Editing", "Executive & Admin Support", "Something else"],
};
