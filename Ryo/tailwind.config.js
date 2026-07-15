/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        glass: {
          light: "rgba(255,255,255,var(--glass-opacity,0.18))",
          dark: "rgba(20,20,25,var(--glass-opacity-dark,0.55))",
          border: "rgba(255,255,255,0.35)",
        },
      },
      backdropBlur: {
        xs: "2px",
        glass: "20px",
      },
      borderRadius: {
        glass: "28px",
        pill: "999px",
        "4xl": "2rem",
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'DSEG7-Classic'", "monospace"],
        jp: ["'Noto Sans JP'", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.4)",
      },
    },
  },
  plugins: [],
};
