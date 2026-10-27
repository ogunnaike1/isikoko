# isikoko — Next.js portfolio

Next.js 15 (App Router) · TypeScript · Tailwind 3 · GSAP + ScrollTrigger · Lenis. Faithful port of `Portfolio Home v4.dc.html`.

```
npm install
npm run dev     # http://localhost:3000
```

> Written without a runtime in the design tool — run `npm install && npm run dev` and `npm run build` once and fix any type nits. Compare against `Portfolio Home v4.dc.html` side by side.

## Structure
- `app/` — layout (metadata, Fontshare fonts), page composition
- `components/` — `Hero`, `Work`, `Expertise`, `About`, `Contact`, `Header`, `Sheet` (curved-top sheet that flattens on scroll), `SmoothScroll` (Lenis ↔ ScrollTrigger)
- `lib/` — `gsap.ts` (plugin registration, easing, reduced-motion), `useMagnetic`, `splitWords`
- `content/` — **edit here**: `projects.ts`, `services.ts`, `site.ts` (email/LinkedIn/location — left empty; never invent)
- `tailwind.config.ts` — palette + font tokens

## Palette
White `#FFFFFF` (all section backgrounds) · Deep Petrol `#182C31` · Muted Teal `#367C83` · Soft Citron `#D8E69A` · Silver Mist `#EAF0ED`.
Fonts: Clash Display + Satoshi (Fontshare, free commercial use).

## Scroll storyboard
Hero panel grows to full bleed → becomes Project One → curved white sheet (Work) rises over it → Expertise sheet rises, cards dim → About sheet rises, services drift → Contact sheet rises with the hero's letter choreography on "CONNECT". Every sheet's curve flattens via scrub.

## Adding a project
Append an object to `content/projects.ts`. Set `card` to show it in the homepage grid. Fields for the upcoming Portfolio page and detail pages (videos, gallery, sections, results, links) are already typed.

## Pages
`/` home · `/work` (filterable, Flip-animated) · `/work/[slug]` project detail · `/services` · `/about` · `/contact`.
Copy for the inner pages lives in `content/pages.ts`; projects in `content/projects.ts` (detail pages are generated from it — add `role`, `deliverables`, `sections`, `results` (verified only), `links`).

## Scroll animation toolkit
Pages are server components wrapped in `<Motion>`; effects are declared with `data-fx` attributes (see `lib/fx.ts`): `hero`, `words`, `fill`, `rise`, `stagger`, `clip` (+`[data-par]`), `line`, `marquee`, `hscroll` (pinned ≥900px), `parallax`, `wordmark`. `PageHero` is sticky so each curved `Sheet` rises over it. `PageTransition` + `TransitionLink` give the petrol-curtain route transition; the intro curtain only plays once per visit.

## Contact form
`app/contact/actions.ts` validates server-side and has a honeypot, a minimum-fill-time trap, link limits and a per-IP rate limit. Delivery uses Resend — copy `.env.example` to `.env.local` and set the three variables. Without them it works in `next dev` (logged to the console) and shows an error in production rather than pretending to send.

## Still to do
Real assets (images/video), email/LinkedIn/location in `content/site.ts`, OG image, a per-process rate limiter replacement if you scale beyond one instance.

## Image credits
All photos are from [Unsplash](https://unsplash.com) and used under the [Unsplash License](https://unsplash.com/license) (free for commercial use, no attribution required — credited here anyway). They are stand-ins: replace each file in `public/images/` with your own work, keeping the filename or updating `content/images.ts`.

| File | Photographer | Photo |
|---|---|---|
| `project-one.jpg` | Vitaly Gariev | [unsplash.com/photos/AqfGvZw56X8](https://unsplash.com/photos/AqfGvZw56X8) |
| `project-two.jpg` | Nubelson Fernandes | [unsplash.com/photos/ZdOsQiwp0Ss](https://unsplash.com/photos/ZdOsQiwp0Ss) |
| `project-three.jpg` | Andres | [unsplash.com/photos/mfWsMDdN-Ro](https://unsplash.com/photos/mfWsMDdN-Ro) |
| `project-four.jpg` | Vitaly Gariev | [unsplash.com/photos/euNzbqwIIUI](https://unsplash.com/photos/euNzbqwIIUI) |
| `hero-small.jpg` | Swello | [unsplash.com/photos/7ljc7nkjNcc](https://unsplash.com/photos/7ljc7nkjNcc) |
| `service-social.jpg` | Sumup | [unsplash.com/photos/Aqc7znjxROM](https://unsplash.com/photos/Aqc7znjxROM) |
| `service-planning.jpg` | Alehandra | [unsplash.com/photos/QK4Ov_0APVU](https://unsplash.com/photos/QK4Ov_0APVU) |
| `service-video.jpg` | Sandisk | [unsplash.com/photos/udRj4qXyAPs](https://unsplash.com/photos/udRj4qXyAPs) |
| `service-influencer.jpg` | Videodeck Co | [unsplash.com/photos/aqwHzP5qaJU](https://unsplash.com/photos/aqwHzP5qaJU) |
| `service-support.jpg` | Marvin Meyer | [unsplash.com/photos/SYTO3xs06fU](https://unsplash.com/photos/SYTO3xs06fU) |
| `about-portrait.jpg` | Jakub Zerdzicki | [unsplash.com/photos/aSoQQLyPe1U](https://unsplash.com/photos/aSoQQLyPe1U) |
| `about-one.jpg` | Muhammad Taha Ibrahim | [unsplash.com/photos/UOIk3LZoR9k](https://unsplash.com/photos/UOIk3LZoR9k) |
| `about-two.jpg` | Jakub Zerdzicki | [unsplash.com/photos/na8R4tWL73I](https://unsplash.com/photos/na8R4tWL73I) |
| `gallery-a.jpg` | Vitaly Gariev | [unsplash.com/photos/AqfGvZw56X8](https://unsplash.com/photos/AqfGvZw56X8) |
| `gallery-b.jpg` | Jakub Zerdzicki | [unsplash.com/photos/KX0oug6R-CI](https://unsplash.com/photos/KX0oug6R-CI) |
| `gallery-c.jpg` | Theregisti | [unsplash.com/photos/ziSzilQLSOM](https://unsplash.com/photos/ziSzilQLSOM) |
| `gallery-d.jpg` | Andri Aeschlimann | [unsplash.com/photos/2toXsQuUg3k](https://unsplash.com/photos/2toXsQuUg3k) |
| `gallery-e.jpg` | Walls Io | [unsplash.com/photos/BuD00MfwvFY](https://unsplash.com/photos/BuD00MfwvFY) |
| `video-poster.jpg` | Mark Cruz | [unsplash.com/photos/VW2oU66mwbc](https://unsplash.com/photos/VW2oU66mwbc) |

The About “portrait” is a workspace shot on purpose — put a real photo of yourself there.
