// All photos are from Unsplash (free to use, see README → Image credits). Swap files in /public/images with real work.
export interface Img { src: string; alt: string; pos?: string }

const i = (file: string, alt: string, pos?: string): Img => ({ src: `/images/${file}.jpg`, alt, pos });

export const images = {
  projectOne: i("project-one", "Content creator filming herself on a phone tripod in a bright living room", "78% 50%"),
  projectTwo: i("project-two", "Video editor working on a timeline at a monitor in a dark room", "50% 40%"),
  projectThree: i("project-three", "Creator presenting to a camera on a tripod on a beach", "50% 30%"),
  projectFour: i("project-four", "Team planning a campaign with sticky notes on a glass wall", "50% 40%"),
  heroSmall: i("hero-small", "Hands holding a phone with a social media feed", "50% 40%"),

  serviceSocial: i("service-social", "Hands scrolling a social media feed on a phone beside a laptop"),
  servicePlanning: i("service-planning", "Person writing a content plan in a planner next to a coffee"),
  serviceVideo: i("service-video", "Video editor at a desk with several monitors showing footage"),
  serviceInfluencer: i("service-influencer", "Content creator recording in a studio with a microphone and camera", "50% 35%"),
  serviceSupport: i("service-support", "Team working on laptops around a shared table, seen from above"),

  aboutPortrait: i("about-portrait", "Creator's desk with monitors, camera and film strips", "40% 50%"),
  aboutOne: i("about-one", "Filmmaker holding a camera outdoors", "50% 35%"),
  aboutTwo: i("about-two", "Camera, lenses and monitors on a filmmaker's desk"),

  galleryA: i("gallery-a", "Woman filming herself on a phone tripod in a bright living room", "82% 50%"),
  galleryB: i("gallery-b", "Desk with camera lenses, headphones and a mechanical keyboard"),
  galleryC: i("gallery-c", "Overhead view of a laptop, editing keypad and camera lens on a colourful desk"),
  galleryD: i("gallery-d", "Colourful video editing timeline with audio waveforms"),
  galleryE: i("gallery-e", "Flipchart covered in coloured sticky notes"),
  videoPoster: i("video-poster", "Person editing video at a monitor in a dark workspace", "60% 50%"),
};
