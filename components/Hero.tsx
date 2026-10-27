"use client";
import { useEffect, useRef } from "react";
import { gsap, EASE, reduced } from "@/lib/gsap";
import Image from "next/image";
import { useMagnetic } from "@/lib/useMagnetic";
import { images } from "@/content/images";

const WORD = "CONTENT";
let introPlayed = false; // the curtain intro plays once per visit, not on every return to Home
const stripe = (a: string, b: string, deg = 135, n = 10) => `repeating-linear-gradient(${deg}deg,${a} 0 ${n}px,${b} ${n}px ${n * 2}px)`;

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  useMagnetic(root);

  useEffect(() => {
    const rm = reduced() || introPlayed;
    setTimeout(() => { introPlayed = true; }, 0); // after StrictMode's synchronous double-run
    const mobile = innerWidth < 760;
    const ctx = gsap.context(() => {
      const q = (s: string) => gsap.utils.toArray<HTMLElement>(s);
      if (mobile) {
        gsap.set("[data-hl]", { width: "88vw", top: "11vh", fontSize: 26 });
        gsap.set("[data-panel]", { left: "24vw", top: "30vh", width: "52vw", height: "30vh" });
        gsap.set("[data-side]", { right: "3vw", left: "3vw", width: "auto", top: "auto", bottom: "calc(3vh + 16vw*.8 + 56px)" });
        gsap.set(["[data-badge]", "[data-small]"], { display: "none" });
      }
      if (innerHeight < 700) q("[data-small]").forEach((e) => (e.style.display = "none"));
      const l = q("[data-l]");

      // ── Intro ────────────────────────────────────────────────
      if (rm) gsap.set("[data-curtain]", { display: "none" });
      else {
        gsap.set(l, { yPercent: 70, opacity: 0, color: "#b7c7c4" });
        gsap.set("[data-hline]", { yPercent: 110 });
        gsap.set("[data-panel]", { opacity: 0, filter: "blur(16px)" });
        gsap.set(["[data-thumb]", "[data-badge]"], { scale: 0 });
        gsap.set("[data-small]", { opacity: 0, filter: "blur(14px)" });
        gsap.set(["[data-side]", "[data-labels]"], { opacity: 0, y: 20 });
        gsap.timeline({ delay: 0.35 })
          .to("[data-curtain]", { yPercent: -112, duration: 1.5, ease: "power3.inOut" })
          .to("[data-labels]", { opacity: 1, y: 0, duration: 0.9, ease: EASE }, 0.9)
          .to("[data-thumb]", { scale: 1, duration: 0.8, ease: "back.out(1.5)" }, 1.1)
          .to("[data-hline]", { yPercent: 0, duration: 1.1, ease: EASE, stagger: 0.09 }, 1.2)
          .to("[data-panel]", { opacity: 1, filter: "blur(0px)", duration: 1.3, ease: "power2.out" }, 1.2)
          .to(l, { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.1 }, 1.3)
          .to(l, { color: "#182C31", duration: 0.7, ease: "none", stagger: 0.1 }, 1.55)
          .to("[data-badge]", { scale: 1, duration: 0.8, ease: "back.out(1.6)" }, 1.9)
          .to("[data-side]", { opacity: 1, y: 0, duration: 1, ease: EASE }, 1.9)
          .to("[data-small]", { opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.out" }, 2.6);
        gsap.to("[data-spin]", { rotation: 360, duration: 12, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      }

      // ── Scroll: hero panel grows to full bleed and becomes Project One ──
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: () => "+=" + innerHeight * 1.1, scrub: 0.7, invalidateOnRefresh: true } })
        .to("[data-panel]", { left: 0, top: 0, width: "100vw", height: "100vh", ease: "power2.inOut", duration: 1 }, 0)
        .to("[data-word] [data-l]", { yPercent: -60, opacity: 0, ease: "power2.in", duration: 0.5, stagger: 0.03 }, 0)
        .to(["[data-hl]", "[data-side]", "[data-small]", "[data-badge]", "[data-labels]", "[data-thumb]"], { opacity: 0, y: -30, ease: "power1.in", duration: 0.4 }, 0)
        .to("[data-pover]", { opacity: 1, ease: "power2.out", duration: 0.3 }, 0.7);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
      <section ref={root} id="top" data-hero className="relative" style={{ height: "330vh" }}>
        {/* Intro curtain — inside the section so it is within the gsap.context scope (it is fixed, so layout is unaffected) */}
        <div
          data-curtain aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center bg-petrol font-sans text-xs font-medium uppercase tracking-[.18em] text-white"
          style={{ height: "128vh", borderRadius: "0 0 50% 50% / 0 0 30vh 30vh", paddingTop: "44vh" }}
        >
          <span>Digital Content &amp; Marketing Specialist</span>
        </div>

        <div className="sticky top-0 h-screen overflow-hidden bg-white">
          {/* thumbnail */}
          <div data-thumb className="absolute z-[3] overflow-hidden" style={{ left: "3vw", top: "3vh", width: "clamp(44px,4.4vw,60px)", aspectRatio: "7/8" }}>
            <Image src={images.aboutPortrait.src} alt="" fill sizes="60px" className="object-cover" />
          </div>

          {/* headline */}
          <h1 data-hl className="absolute m-0 font-display font-medium" style={{ left: "3vw", top: "15vh", width: "min(30vw,460px)", minWidth: 240, fontSize: "clamp(24px,2.6vw,42px)", lineHeight: 1.08, letterSpacing: "-.015em" }}>
            {["I create content", "that connects brands", "with their audience."].map((t) => (
              <span key={t} className="block overflow-hidden"><span data-hline className="block">{t}</span></span>
            ))}
          </h1>

          {/* central panel */}
          <div data-panel className="absolute z-[2] overflow-hidden" style={{ left: "35vw", top: "12vh", width: "max(26vw,180px)", height: "62vh", background: stripe("#EAF0ED", "#dfe8e4") }}>
            {/* showreel poster — swap for a <video> when ready */}
            <Image src={images.projectOne.src} alt={images.projectOne.alt} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: images.projectOne.pos }} />
            <div data-pover className="absolute inset-0 flex flex-col justify-between text-petrol opacity-0" style={{ padding: "clamp(70px,12vh,110px) 3vw 4vh", background: "linear-gradient(180deg,rgba(255,255,255,.72) 0%,rgba(255,255,255,.1) 40%,rgba(255,255,255,.1) 60%,rgba(255,255,255,.78) 100%)" }}>
              <div className="flex justify-between font-sans text-xs font-medium uppercase tracking-[.14em]"><span>01 — Featured</span><span>Social Media &amp; Strategy</span></div>
              <div className="flex items-end justify-between gap-5">
                <span className="font-display font-semibold" style={{ fontSize: "clamp(52px,11vw,190px)", lineHeight: 0.85, letterSpacing: "-.03em" }}>Project<br />One</span>
                <span className="text-right font-sans text-[11px] font-medium uppercase tracking-[.14em] text-ink-3">Placeholder<br />Replace in project data</span>
              </div>
            </div>
          </div>

          {/* rotating badge */}
          <a data-badge href="#work" aria-label="View my work" className="absolute z-[3] block !text-petrol" style={{ left: "calc(35vw + max(26vw,180px) + 3vw)", top: "19vh", width: 78, height: 78 }}>
            <svg data-spin viewBox="0 0 100 100" width="78" height="78" className="absolute inset-0" aria-hidden>
              <defs><path id="bc" d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" /></defs>
              <circle cx="50" cy="50" r="49" fill="#D8E69A" stroke="#182C31" strokeWidth="1" />
              <text fontFamily="Satoshi" fontSize="10" letterSpacing="2.4" fill="#182C31" fontWeight="700">
                <textPath href="#bc" textLength="215" lengthAdjust="spacing">VIEW MY WORK · VIEW MY WORK · </textPath>
              </text>
            </svg>
          </a>

          {/* intro + buttons */}
          <div data-side className="absolute z-[3]" style={{ right: "3vw", top: "15vh", width: "min(24vw,330px)", minWidth: 230 }}>
            <p className="mb-5 mt-0 font-sans text-ink-2" style={{ fontSize: "clamp(13px,1vw,15px)", lineHeight: 1.6 }}>
              I help brands build meaningful connections through content strategy, social media management, video editing, influencer marketing, and creative digital campaigns.
            </p>
            <div className="flex flex-wrap gap-2">
              <a data-mag href="#work" className="inline-block rounded-full bg-teal px-[22px] py-[13px] font-sans text-[13px] font-bold !text-white no-underline hover:bg-teal-hover">View My Work</a>
              <a data-mag href="#contact" className="inline-block rounded-full border border-petrol px-[21px] py-3 font-sans text-[13px] font-bold !text-petrol no-underline hover:bg-mist">Get In Touch</a>
            </div>
          </div>

          {/* small image */}
          <div data-small className="absolute z-[2] overflow-hidden" style={{ right: "5vw", bottom: "calc(31vh + min(16vw,32vh)*.1 + 44px)", width: "clamp(46px,5.6vw,92px)", aspectRatio: "4/5" }}>
            <Image src={images.heroSmall.src} alt={images.heroSmall.alt} fill sizes="92px" className="object-cover" />
          </div>

          {/* labels */}
          <div data-labels className="absolute z-[3] flex justify-between font-sans text-[11px] font-medium tracking-[.1em]" style={{ left: "3vw", right: "3vw", bottom: "calc(31vh + min(16vw,32vh)*.1 + 14px)" }}>
            <span>Plan</span><span style={{ marginLeft: "18vw" }}>Create</span><span>Publish</span>
          </div>

          {/* wordmark — in front of the panel, overlapping its lower edge */}
          <div data-word aria-label="Content" className="absolute z-[4] flex whitespace-nowrap font-display font-medium text-petrol" style={{ left: "3vw", bottom: "calc(31vh - min(16vw,32vh)*.7)", fontSize: "min(16vw,32vh)", lineHeight: 0.8, letterSpacing: ".015em" }}>
            {WORD.split("").map((c, i) => (
              <span key={i} aria-hidden className="block overflow-hidden" style={{ padding: ".05em 0 .02em" }}><span data-l className="block">{c}</span></span>
            ))}
          </div>
        </div>
      </section>
  );
}
