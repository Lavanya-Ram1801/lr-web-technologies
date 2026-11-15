/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: token("c-bg"),
        surface: token("c-surface"),
        muted: token("c-muted"),
        ink: token("c-ink"),
        soft: token("c-soft"),
        line: token("c-line"),
        brand: {
          DEFAULT: token("c-brand"),
          dark: token("c-brand-dark"),
          light: token("c-brand-light"),
        },
        accent: token("c-accent"),
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 10px 40px -10px rgb(var(--c-brand) / 0.55)",
        card: "0 1px 2px rgb(0 0 0 / 0.04), 0 12px 32px -12px rgb(var(--c-brand) / 0.25)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        spinSlow: { to: { transform: "rotate(360deg)" } },
        shimmer: { to: { transform: "translateX(100%)" } },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spinSlow 40s linear infinite",
        "spin-slower": "spinSlow 70s linear infinite reverse",
      },
    },
  },
  plugins: [],
};
