export const PT_EVENT = "pt:go";

/** Ask <PageTransition/> to cover the screen, route to `href`, then reveal the new page. */
export const go = (href: string) => window.dispatchEvent(new CustomEvent(PT_EVENT, { detail: href }));
