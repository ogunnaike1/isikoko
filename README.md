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

## Images
All images are real work: screenshots in `public/images/` and video stills/videos hosted on Cloudinary (see `content/images.ts`).
