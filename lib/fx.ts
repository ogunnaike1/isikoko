import { gsap, ScrollTrigger, EASE } from "./gsap";
import { splitWordsReveal } from "./splitWords";

const INK = "#182C31";
const MUTE = "#bccac7";
const GREY = "#b7c7c4";

const q = (root: ParentNode, s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));

/**
 * Declarative scroll effects driven by data attributes, so pages stay server components.
 *   data-fx="hero"       sticky page hero: masked line reveal on load, recedes as the next sheet covers it
 *   data-fx="words"      split-word mask reveal
 *   data-fx="fill"       words ink in from grey, scrubbed
 *   data-fx="rise"       fade/translate in (data-y, data-delay)
 *   data-fx="stagger"    children [data-item] rise in sequence
 *   data-fx="clip"       clip-path reveal, scrubbed (data-dir l|r|u|circle|grow) + [data-par] inner parallax
 *   data-fx="line"       rule draws left → right
 *   data-fx="marquee"    infinite ticker that speeds up / reverses with scroll (data-dir, data-speed)
 *   data-fx="hscroll"    pinned horizontal scroll ≥900px ([data-track], [data-hbar], [data-hpanel], [data-hnum])
 *   data-fx="parallax"   vertical drift (data-speed in yPercent)
 *   data-fx="wordmark"   big letters rise and ink in (letters are [data-wl])
 * Returns a cleanup for anything gsap.context does not own (matchMedia).
 */
export function runFx(root: HTMLElement, rm: boolean) {
  const cleanups: (() => void)[] = [];

  // ── page hero ──────────────────────────────────────────────
  q(root, '[data-fx="hero"]').forEach((h) => {
    const lines = q(h, "[data-line]"), meta = q(h, "[data-hmeta]"), title = q(h, "[data-htitle]");
    if (rm) return;
    gsap.set(lines, { yPercent: 115 });
    gsap.set(meta, { opacity: 0, y: 24 });
    gsap.timeline({ delay: 0.45 })
      .to(lines, { yPercent: 0, duration: 1.3, ease: EASE, stagger: 0.1 })
      .to(meta, { opacity: 1, y: 0, duration: 1, ease: EASE, stagger: 0.1 }, 0.5);
    gsap.to(title, { yPercent: -14, opacity: 0.1, ease: "none", scrollTrigger: { trigger: h, start: "top top", end: "+=" + innerHeight * 0.9, scrub: true } });
    gsap.to(meta, { opacity: 0, y: -20, ease: "none", scrollTrigger: { trigger: h, start: "top top", end: "+=" + innerHeight * 0.4, scrub: true } });
  });

  // ── word reveals ───────────────────────────────────────────
  if (!rm) q(root, '[data-fx="words"]').forEach(splitWordsReveal);

  // ── scrubbed ink-in text ───────────────────────────────────
  q(root, '[data-fx="fill"]').forEach((el) => {
    const text = el.dataset.text ?? el.textContent ?? "";
    el.dataset.text = text;
    el.setAttribute("aria-label", text.trim());
    el.innerHTML = "";
    const to = el.dataset.to ?? INK, from = el.dataset.from ?? MUTE;
    const words = text.trim().split(/\s+/).map((w) => {
      const s = document.createElement("span");
      s.setAttribute("aria-hidden", "true");
      s.textContent = w + " ";
      s.style.color = rm ? to : from;
      el.appendChild(s);
      return s;
    });
    if (rm) return;
    gsap.to(words, { color: to, ease: "none", stagger: 0.12, scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 52%", scrub: 0.4 } });
  });

  if (!rm) {
    // ── rise / stagger ───────────────────────────────────────
    q(root, '[data-fx="rise"]').forEach((el) =>
      gsap.from(el, { y: Number(el.dataset.y ?? 40), opacity: 0, duration: 1.1, ease: EASE, delay: Number(el.dataset.delay ?? 0), scrollTrigger: { trigger: el, start: "top 90%" } }));
    q(root, '[data-fx="stagger"]').forEach((el) =>
      gsap.from(q(el, "[data-item]"), { y: 50, opacity: 0, duration: 1.1, ease: EASE, stagger: 0.1, scrollTrigger: { trigger: el, start: "top 85%" } }));

    // ── clip reveals + inner parallax ────────────────────────
    q(root, '[data-fx="clip"]').forEach((el) => {
      const dir = el.dataset.dir ?? "l";
      const from = { l: "inset(0% 100% 0% 0%)", r: "inset(0% 0% 0% 100%)", u: "inset(100% 0% 0% 0%)", circle: "circle(0% at 50% 50%)", grow: "inset(14% 14% 14% 14%)" }[dir] ?? "inset(0% 100% 0% 0%)";
      const to = dir === "circle" ? "circle(75% at 50% 50%)" : "inset(0% 0% 0% 0%)";
      gsap.fromTo(el, { clipPath: from }, { clipPath: to, ease: "none", scrollTrigger: { trigger: el, start: "top 92%", end: el.dataset.end ?? "top 45%", scrub: true } });
      const par = el.querySelector<HTMLElement>("[data-par]");
      if (par) gsap.fromTo(par, { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    });

    // ── rules ────────────────────────────────────────────────
    q(root, '[data-fx="line"]').forEach((el) =>
      gsap.from(el, { scaleX: 0, transformOrigin: "left center", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 92%" } }));

    // ── generic parallax ─────────────────────────────────────
    q(root, '[data-fx="parallax"]').forEach((el) => {
      const s = Number(el.dataset.speed ?? 10);
      gsap.fromTo(el, { yPercent: -s }, { yPercent: s, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } });
    });

    // ── marquee: reverses with scroll direction, surges with velocity ──
    q(root, '[data-fx="marquee"]').forEach((m) => {
      const track = m.querySelector<HTMLElement>("[data-track]");
      if (!track) return;
      const flip = m.dataset.dir === "r";
      const tween = gsap.fromTo(track, { xPercent: flip ? -50 : 0 }, { xPercent: flip ? 0 : -50, duration: Number(m.dataset.speed ?? 40), ease: "none", repeat: -1 });
      ScrollTrigger.create({
        trigger: m, start: "top bottom", end: "bottom top",
        onUpdate: (self) => {
          const dir = self.direction * (flip ? -1 : 1);
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 6);
          gsap.timeline({ overwrite: true }).to(tween, { timeScale: dir * boost, duration: 0.2 }).to(tween, { timeScale: dir, duration: 1 });
        },
      });
    });

    // ── pinned horizontal scroll (desktop) ───────────────────
    q(root, '[data-fx="hscroll"]').forEach((sec) => {
      const track = sec.querySelector<HTMLElement>("[data-track]");
      if (!track) return;
      const bar = sec.querySelector<HTMLElement>("[data-hbar]");
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const dist = () => track.scrollWidth - sec.clientWidth;
        const move = gsap.to(track, {
          x: () => -dist(), ease: "none",
          scrollTrigger: { trigger: sec, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: 1 },
        });
        if (bar) gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: sec, start: "top top", end: () => "+=" + dist(), scrub: true, invalidateOnRefresh: true } });
        q(sec, "[data-hnum]").forEach((n) => {
          const panel = n.closest<HTMLElement>("[data-hpanel]");
          if (panel) gsap.fromTo(n, { xPercent: 18 }, { xPercent: -18, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: move, start: "left right", end: "right left", scrub: true } });
        });
        q(sec, "[data-hpanel] [data-hline]").forEach((l) => {
          const panel = l.closest<HTMLElement>("[data-hpanel]")!;
          gsap.from(l, { yPercent: 110, duration: 1, ease: EASE, scrollTrigger: { trigger: panel, containerAnimation: move, start: "left 75%", toggleActions: "play none none reverse" } });
        });
      });
      cleanups.push(() => mm.revert());
    });

    // ── wordmark letter sweep (same choreography as the hero wordmark) ──
    q(root, '[data-fx="wordmark"]').forEach((wm) => {
      const l = q(wm, "[data-wl]");
      gsap.set(l, { yPercent: 70, opacity: 0, color: GREY });
      gsap.timeline({ scrollTrigger: { trigger: wm, start: "top 92%" } })
        .to(l, { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.1 }, 0)
        .to(l, { color: INK, duration: 0.7, ease: "none", stagger: 0.1 }, 0.25);
    });
  }

  return () => cleanups.forEach((f) => f());
}
