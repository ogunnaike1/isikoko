import { gsap, EASE } from "./gsap";

/** Word-mask reveal. Replaces the element's text with masked word spans, animates on enter. */
export function splitWordsReveal(el: HTMLElement) {
  // keep the source text so a re-run (React StrictMode / HMR) does not read back the split spans
  const text = el.dataset.text ?? el.textContent ?? "";
  el.dataset.text = text;
  const words = text.trim().split(/\s+/);
  el.setAttribute("aria-label", words.join(" "));
  el.innerHTML = "";
  const inner = words.map((w) => {
    const o = document.createElement("span");
    o.setAttribute("aria-hidden", "true");
    o.style.cssText = "display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.1em;margin-right:.26em";
    const i = document.createElement("span");
    i.style.display = "inline-block";
    i.textContent = w;
    o.appendChild(i);
    el.appendChild(o);
    return i;
  });
  gsap.from(inner, { yPercent: 110, duration: 1.1, ease: EASE, stagger: 0.04, scrollTrigger: { trigger: el, start: "top 88%" } });
}
