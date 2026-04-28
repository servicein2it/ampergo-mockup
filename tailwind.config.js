/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#0A0E14",
          surface: "#141A22",
          elevated: "#1C2430",
        },
        border: {
          subtle: "#222B38",
        },
        accent: {
          neon: "#00E676",
          "neon-dim": "#0A8F4D",
          cyan: "#00D4FF",
        },
        status: {
          warning: "#FFB300",
          critical: "#FF3B30",
        },
        ink: {
          primary: "#F5F7FA",
          secondary: "#9AA5B1",
          disabled: "#4A5562",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "IBM Plex Sans Thai",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        thai: ["IBM Plex Sans Thai", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "Menlo", "monospace"],
      },
      fontSize: {
        display: ["32px", { lineHeight: "38px", fontWeight: "700" }],
        t1: ["24px", { lineHeight: "30px", fontWeight: "700" }],
        t2: ["20px", { lineHeight: "26px", fontWeight: "600" }],
        body: ["16px", { lineHeight: "22px", fontWeight: "500" }],
        bodysm: ["14px", { lineHeight: "20px", fontWeight: "500" }],
        cap: ["12px", { lineHeight: "16px", fontWeight: "500" }],
      },
      borderRadius: {
        card: "16px",
        sheet: "24px",
        btn: "12px",
      },
      spacing: {
        gutter: "20px",
      },
      boxShadow: {
        neon: "0 0 24px rgba(0, 230, 118, 0.35)",
        neonSoft: "0 0 12px rgba(0, 230, 118, 0.20)",
      },
      animation: {
        "pulse-neon": "pulseNeon 1.6s ease-in-out infinite",
        "spin-slow": "spin 2.4s linear infinite",
      },
      keyframes: {
        pulseNeon: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.4)" },
        },
      },
    },
  },
  plugins: [],
};
