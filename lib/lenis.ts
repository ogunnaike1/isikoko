import type Lenis from "lenis";

let inst: Lenis | null = null;
export const setLenis = (l: Lenis | null) => { inst = l; };

export const scrollToTop = (immediate = false) => {
  if (inst) inst.scrollTo(0, { immediate, duration: 1.2 });
  else window.scrollTo({ top: 0, behavior: immediate ? "instant" : "smooth" });
};

/** Freeze / release page scroll (menu overlay). */
export const lockScroll = (on: boolean) => { if (on) inst?.stop(); else inst?.start(); };
