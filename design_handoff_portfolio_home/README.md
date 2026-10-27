# Handoff: Portfolio Homepage (Digital Content & Marketing Specialist)

## Overview
Single-page homepage for a personal portfolio. One continuous scroll-choreographed experience: white hero (modelled on the reference video) → featured project → more work → expertise → about → contact. Pages still to build after approval: About, Portfolio (filterable) + project detail, Contact (form). Nav currently only anchors to homepage sections.

## About the Design Files
`Portfolio Home v4.dc.html` is a **design reference built in HTML** (a prototype of look and motion), not production code. Recreate it in the target stack: **Next.js (App Router) + TypeScript + Tailwind CSS + GSAP/ScrollTrigger + Lenis** as requested. Do not ship the HTML. Reference video: `reference/portfolio_hero_reference.mp4`; extracted frames: `reference/ref_contact.png`.

## Fidelity
**High-fidelity.** Colors, type, spacing, easing and scroll ranges below are final. Images/video are labelled striped placeholders (no real assets supplied) — keep them as clearly replaceable slots. Email/LinkedIn/location are placeholders ("add in site config"): do not invent values.

## Design Tokens
Colors (white `#FFFFFF` is the dominant background everywhere; no full-section dark/colored backgrounds):
- White `#FFFFFF` — all section backgrounds
- Deep Petrol `#182C31` — text, headings, intro curtain, thumbnail, curved-corner wedges behind sheets
- Muted Teal `#367C83` — primary buttons (hover `#2b666c`), links, contact circle, progress line, accent word "work"
- Soft Citron `#D8E69A` — hero badge fill, small hero image, one project card, one service scene
- Silver Mist `#EAF0ED` — hero panel, project/portrait placeholders, borders, service scene
- Supporting: secondary text `#3d5257` / `#4d6166`; hairline borders `#cfdcd8`; muted/inactive type `#bccac7`; initial letter grey `#b7c7c4`; alt silver `#dfe8e4`; teal hover `#2f6e75`; petrol tint `#244249`
Fonts (free for commercial use via Fontshare — load as two separate `<link>`s):
- Display: **Clash Display** 500/600/700 — `https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap`
- Body/UI: **Satoshi** 400/500/700 — `https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap`
Type scale:
- Hero wordmark: Clash 500, `min(16vw,32vh)`, line-height .8, letter-spacing .015em, uppercase, petrol
- Hero headline: Clash 500, `clamp(24px,2.6vw,42px)`/1.08, ls -.015em
- Section H2: Clash 600, `clamp(48px,9vw,150px)`/.88, ls -.03em
- Service name: Clash 600, `clamp(32px,4.6vw,76px)`/.98, ls -.025em
- Statement (About): Clash 500, `clamp(30px,4vw,64px)`/1.06, ls -.02em
- Card title: Clash 500, `clamp(24px,2.4vw,38px)`/1.05
- Body: Satoshi 400 `clamp(13px,1vw,15px)`/1.6 (hero), 14–16px elsewhere
- Labels/nav: Satoshi 500 11–12px, uppercase, ls .1–.18em
- Buttons: Satoshi 700 13px
Spacing: horizontal page padding `3vw`; section vertical padding 20–22vh top, 14–16vh bottom. Radius: pills `99px`; images square (0). Shadows: none.
Easing: `expo.out` (text reveals), `power3.inOut` / `power2.inOut` (large shape moves), `back.out(1.5–1.8)` (pop-ins), `none` for all scrub tweens.

## Global behavior
- Lenis smooth scroll (`lerp .12`) wired to ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t=>lenis.raf(t*1000))`, `lagSmoothing(0)`). Disabled under `prefers-reduced-motion`; intro curtain and split/letter reveals also skipped then.
- Fixed header (z-60, transparent, petrol text, Satoshi 500 11px uppercase ls .14em): left padding `calc(3vw + clamp(44px,4.4vw,60px) + 20px)`, links `Work | Services | About`; right `Contact` + 3-line hamburger glyph (22×1.5px bars, 4px gap) linking to #contact.
- Magnetic buttons (`data-mag`, pointer:fine only): `quickTo` x/y, 0.5s `power3`, offset = 0.3 × cursor distance from centre; reset on leave.
- Split-word reveal (`data-split`): words wrapped in overflow-hidden spans (`margin-right .26em`), `yPercent 110→0`, 1.1s `expo.out`, stagger .04, trigger `top 88%`.
- Mobile (<760px): headline width 88vw/top 11vh/26px; hero panel left 24vw, top 30vh, 52vw×30vh; side block full-width above wordmark; badge and small image hidden. Small image also hidden when viewport height <700px.

## Screen: Home (sections in order)
Scene-to-scene links are the core of the design: each section is a white "sheet" with a curved top (`border-radius: 50% 50% 0 0 / 16vh 16vh 0 0`) that rises over the previous scene; a wrapper behind it is Deep Petrol (so petrol shows only in the curved corner wedges). Each sheet's top radii tween to `0% 0px` (scrub, `top bottom → top 15%`) so the curve flattens as it covers the screen.

### 1. Hero (white, sticky stage)
Wrapper `height:330vh`; inner stage `position:sticky; top:0; height:100vh; overflow:hidden; background:#fff`. Positions (all absolute inside stage):
- **Thumbnail**: left 3vw, top 3vh, width `clamp(44px,4.4vw,60px)`, aspect 7/8, petrol diagonal stripes (`#182C31 / #244249`, 135°, 5px).
- **Headline** (`h1`): left 3vw, top 15vh, width `min(30vw,460px)` (min 240px), 3 lines each in overflow-hidden mask: "I create content" / "that connects brands" / "with their audience."
- **Central panel**: left 35vw, top 12vh, width `max(26vw,180px)`, height 62vh, z 2, Silver Mist diagonal stripes (`#EAF0ED/#dfe8e4`, 10px). Tiny label top-left (12px inset): "HERO SHOWREEL · DROP VIDEO" (Satoshi 500 10px caps). Contains hidden overlay (see scroll step 1): top row "01 — FEATURED" left / "SOCIAL MEDIA & STRATEGY" right; bottom: "Project One" Clash 600 `clamp(52px,11vw,190px)`/.85 left, "Placeholder / Replace in project data" right.
- **Badge**: 78px circle, left `calc(35vw + max(26vw,180px) + 3vw)`, top 19vh, fill Citron, 1px petrol stroke, rotating SVG textPath "VIEW MY WORK · VIEW MY WORK · " (Satoshi 700, 10px, ls 2.4, `textLength=215` on r=35 path). Links to #work. Rotates 360° / 12s linear loop.
- **Side block**: right 3vw, top 15vh, width `min(24vw,330px)` (min 230px): intro paragraph ("I help brands build meaningful connections through content strategy, social media management, video editing, influencer marketing, and creative digital campaigns.", color `#3d5257`) + buttons: **View My Work** (teal fill, white text, 13px 22px padding, pill) → #work; **Get In Touch** (1px petrol border, hover Silver Mist) → #contact.
- **Small image**: right 5vw, bottom `calc(31vh + min(16vw,32vh)*.1 + 44px)`, width `clamp(46px,5.6vw,92px)`, aspect 4/5, Citron stripes.
- **Labels row**: left/right 3vw, bottom `calc(31vh + min(16vw,32vh)*.1 + 14px)`, space-between: "Plan", "Create" (margin-left 18vw), "Publish" — Satoshi 500 11px.
- **Wordmark "CONTENT"**: left 3vw, bottom `calc(31vh - min(16vw,32vh)*.7)`, z 4 (in front of panel; overlaps panel's lower edge). Each letter in an overflow-hidden box (`padding .05em 0 .02em`).

**Intro timeline** (delay .35s): 
1. Black-ish Petrol **curtain** (fixed, height 128vh, bottom radius `50% / 30vh`, centered caps label "Digital Content & Marketing Specialist") starts covering screen → `yPercent -112`, 1.5s `power3.inOut`.
2. t=.9 labels fade/slide up (.9s expo). t=1.1 thumb scale 0→1 (.8s back.out 1.5). t=1.2 headline lines `yPercent 110→0` (1.1s expo, stagger .09); panel opacity 0→1 + blur 16px→0 (1.3s power2.out).
3. t=1.3 wordmark letters `yPercent 70→0`, opacity 0→1 (.9s power3.out, stagger .1) while colour `#b7c7c4 → #182C31` (.7s, stagger .1, offset .25s later) — grey-to-ink sweep like the video.
4. t=1.9 badge scale 0→1 (back.out 1.6) and side block fade/rise; t=2.6 small image fades in from blur 14px (1.2s).

**Scroll step 1 — Hero → Featured** (trigger hero wrapper, `top top`, end `+= 1.1 × innerHeight`, scrub .7): panel animates to `left 0, top 0, width 100vw, height 100vh` (`power2.inOut`, duration 1); wordmark letters `yPercent -60`, opacity 0 (stagger .03); headline/side/small/badge/labels/thumb fade + `y -30`; panel label fades; panel overlay ("Project One") fades in at position .7. The panel IS Project One.

### 2. More selected work (id `work`)
Sheet pulled up by `margin-top:-100vh` (z 2) so it rises over the still-pinned full-bleed panel. Padding 22vh 3vw 16vh. Header: H2 "More selected / **work**" (second line teal) + muted note right. Scroll: line 1 slides from -16% viewport width → 0, line 2 from +16% (scrub, `top 90% → top 35%`); a 3px teal rule scales `scaleX 0→1` (origin left) in same range.
Grid: 12 columns, gap `clamp(36px,6vw,90px) 2vw`. Cards (all placeholders): Project Two (cols span 5, ratio 4/5), Project Three (cols 7/span 6, ratio 16/11, margin-top 14vh), Project Four (cols 2/span 8, ratio 16/10). Each: image block (Silver Mist/Citron stripes, label bottom-left e.g. "Placeholder · video"), then row: title (Clash) left + category (Satoshi 11px caps) right with 1px `#cfdcd8` bottom border.
Card scroll: image clip-path scrub `inset(0 100% 0 0)→inset(0)` (even cards) / `inset(0 0 0 100%)→inset(0)` (odd), range `top 92% → top 45%`; title row `y 36→0, opacity 0→1` same range; inner image parallax `yPercent -6→6` across the whole pass; hover scale 1.06 (.9s `cubic-bezier(.16,1,.3,1)`). As Services sheet rises, cards dim to opacity .35 (scrub `#services top 95% → top 20%`).

### 3. Expertise (id `services`)
Wrapper bg petrol (`margin-top:-1px`), sheet white, z 3. Header: H2 "Expertise" + "Five ways I help brands" label. Two-column grid (`repeat(auto-fit,minmax(min(100%,420px),1fr))`, gap `clamp(20px,5vw,90px)`):
- **Left sticky stage** (`position:sticky; top:max(72px,10vh)`; panel height `clamp(230px,46vw,72vh)`). Five stacked "scenes"; counter pill top-left (white, petrol Clash 600 14px, rolling digits "01–05" + "/ 05").
  1. Silver bg, 7×4 grid of squares (white, a few teal/petrol/one citron); squares pop (scale 0→1, `back.out(1.8)`, random stagger .02).
  2. Petrol bg, three 3:4 cards (white, citron, teal) fan to rotations -9/0/9° and x -34/0/34 (1.1s expo).
  3. Teal bg, white circle with petrol play triangle (pop from .5) + bottom timeline fill `scaleX 0→1` 2s `power2.inOut`.
  4. Citron bg, three concentric petrol-bordered rings each carrying a small dot, rotating continuously (alternating direction, 9/13/17s); rings scale/fade in.
  5. `#dfe8e4` bg, five bars (heights 30/48/40/72/100%; teal ×4, petrol last) `scaleY 0→1`, stagger .08.
  Scene change = new scene wipes in with `clip-path: circle(0%→75% at 50% 50%)`, .9s `power3.inOut`, brought to top via z-index; counter `yPercent -20×i` (.7s).
- **Right list**: left rule 2px Silver Mist with teal fill scrubbing `scaleY` across list. Five blocks (min-height 52vh, centered): number (teal, Satoshi 12px), name, description (16px; opacity .45 → 1 when active), tag pills (1px `#cfdcd8` border, hover teal fill/white text). Active block = crossing 58% of viewport (`top 58% → bottom 58%`); active name colour petrol, others `#bccac7` (.5s).
- Content: 01 Social Media Management (Content calendars, Community, Publishing) · 02 Content Creation & Planning (Strategy, Graphics, Copy) · 03 Video Editing & Production (Short-form, YouTube, Educational) · 04 Influencer Marketing (Outreach, Collaborations, Coordination) · 05 Digital Marketing Support (Campaign assets, Lead generation, Operations). Descriptions are in the HTML file.
- **<900px**: single column; panel becomes sticky at top 72px, height 34vh, list below (margin-top `calc(34vh + 16px)`, white bg), blocks min-height 40vh.
- Services rows drift `yPercent -4` while About sheet rises.

### 4. About (id `about`)
Wrapper petrol, white sheet (z 4), padding 22vh 3vw 16vh. Auto-fit 2-col grid (min 320px, gap `clamp(28px,6vw,110px)`). Left: portrait placeholder (4/5, max-width 520, Silver Mist stripes, label "Portrait · drop photo") revealed by `clip-path: circle(0%→75% at 50% 50%)` scrub (`top 90% → top 30%`) — echoing the hero badge. Right: label "About"; statement (split-word reveal): "Strategy first, craft always. I turn brand goals into content people stop for — planned, produced and published end to end."; 3 columns under a hairline: **Approach** (Understand the brand goal, plan the content, execute and refine.), **Core** (Social media, content production, video editing, influencer campaigns, marketing support.), **Also strong in** (Sales support, customer engagement, administrative operations.); outlined teal pill "More about me →" (hover Silver Mist). Section dims to .4 as Contact sheet rises.

### 5. Contact (id `contact`)
Wrapper petrol, white sheet (z 5), min-height 100vh, padding 20vh 3vw 3vh, `overflow:hidden`. Mirrors the hero composition: headline top-left (same style as hero headline, width `min(34vw,520px)`): "Have a brand to grow? Let's make content people remember."; teal circle CTA "Get in touch" (left 36vw, top 22vh, `clamp(110px,11vw,170px)`, magnetic, scales in with `back.out(1.6)`); right column list (Satoshi 500 12px caps, `#3d5257`): "Email — add in site config", "LinkedIn — add in site config", "Location — add in site config"; labels row "Strategy / Content / Results"; bottom wordmark **CONNECT** (Clash 600, same size/position logic as hero wordmark: bottom 3vh) with the same letter stagger + grey→petrol sweep, triggered at `#contact top 45%`.

## State / Data
No app state on the homepage; everything is scroll-driven. The only stateful piece is the Expertise active index (`cur`). Projects, services and tag lists should live in typed data files (`content/projects.ts`, `content/services.ts`) — each project: title, slug, category, description, thumbnail, cover, videos, gallery, case-study sections, role, deliverables, results (only if verified), external links, featured flag.

## Implementation notes for Next.js
- Put all GSAP in client components using `gsap.context()` + cleanup; register ScrollTrigger once. Call `ScrollTrigger.refresh()` after fonts load.
- Use `invalidateOnRefresh: true` on viewport-derived tweens (hero scrub end, sheet radii).
- Use `next/font` or the Fontshare CSS links; avoid layout shift on the wordmark (fonts must be loaded before measuring).
- Use `next/image` for real assets; lazy-load below-fold video with posters.
- Test scrolling both directions; all sheet/panel tweens are `scrub` so they reverse cleanly.
- Accessibility: wordmark letters are `aria-hidden` with an `aria-label` on the container; keep visible focus rings on links/buttons; honour `prefers-reduced-motion`.

## Assets
None supplied. All imagery is striped placeholders (do not hand-draw replacements). Fonts via Fontshare (free commercial). GSAP 3.12.5, ScrollTrigger, Lenis 1.1.13.

## Files
- `Portfolio Home v4.dc.html` — final homepage reference (open in a browser; logic in its `<script data-dc-script>`; all values above are literal inline styles in the markup)
- `reference/portfolio_hero_reference.mp4` — hero motion reference
- `reference/ref_contact.png` — 12 extracted frames from the reference
