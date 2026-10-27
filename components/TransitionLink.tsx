"use client";
import Link from "next/link";
import { go } from "@/lib/transition";

/** next/link that routes through the curtain page transition. Hash and external links behave normally. */
export default function TransitionLink({ onClick, href, ...rest }: React.ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        const h = typeof href === "string" ? href : href.pathname ?? "";
        if (!h.startsWith("/") || rest.target === "_blank") return;
        e.preventDefault();
        go(h);
      }}
    />
  );
}
