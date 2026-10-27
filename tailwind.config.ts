import type { Config } from "tailwindcss";

// Design tokens — white is the dominant background everywhere.
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        petrol: { DEFAULT: "#182C31", tint: "#244249" },
        teal: { DEFAULT: "#367C83", hover: "#2b666c", deep: "#2f6e75" },
        citron: { DEFAULT: "#D8E69A", deep: "#cbd98b" },
        mist: { DEFAULT: "#EAF0ED", deep: "#dfe8e4", soft: "#e2ebe7", line: "#cfdcd8" },
        ink: { 2: "#3d5257", 3: "#4d6166", mute: "#bccac7", grey: "#b7c7c4" },
      },
      keyframes: { cue: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(200%)" } } },
      fontFamily: {
        display: ["'Clash Display'", "sans-serif"],
        sans: ["Satoshi", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
