// Real work only. Local files live in /public/images; video stills come from Cloudinary (remote host allowed in next.config.mjs).
export interface Img { src: string; alt: string; pos?: string; w: number; h: number }

const CLD = "https://res.cloudinary.com/dhmqhless/video/upload";
const VIDEO = (id: string) => `${CLD}/vc_h264,f_mp4/${id}.mp4`;
const STILL = (id: string) => `${CLD}/${id}.jpg`;

export const media = {
  monosendCreator: { id: "v1793577862/IMG_4842_e62fvr", w: 1920, h: 1080 },
  youtuber1: { id: "v1793577817/IMG_4843_ruyznr", w: 1080, h: 1920 },
  youtuber2: { id: "v1793577850/IMG_4844_yyfhjh", w: 1080, h: 1920 },
  youtuber3: { id: "v1793579218/IMG_4845_v4kol1", w: 1080, h: 1920 },
  youtuber4: { id: "v1793579309/IMG_4854_t5qpoa", w: 1080, h: 1920 },
  detectai: { id: "v1793579324/IMG_4856_zxtkwo", w: 1080, h: 1920 },
};
export type MediaKey = keyof typeof media;

export const video = (k: MediaKey) => ({ src: VIDEO(media[k].id), poster: STILL(media[k].id), ratio: `${media[k].w}/${media[k].h}` });
export const still = (k: MediaKey, alt: string, pos?: string): Img => ({ src: STILL(media[k].id), alt, pos, w: media[k].w, h: media[k].h });

const local = (file: string, alt: string, w: number, h: number, pos?: string): Img => ({ src: `/images/${file}`, alt, w, h, pos });

export const images = {
  monosendReport: local("monosend-report.png", "Monosend social media performance report summary", 1280, 806, "0% 0%"),
  xAnalytics: local("x-analytics.png", "X account analytics showing impressions, engagements, likes and reposts", 591, 1280, "50% 0%"),
  contentPlanCover: local("content-plan-cover.png", "Weekly content plan title page with the weekly theme and post counts", 1280, 880, "0% 0%"),
  contentPlanSchedule: local("content-plan-schedule.png", "Weekly publishing schedule by date, pillar, format, topic and call to action", 1280, 698, "0% 0%"),
};
