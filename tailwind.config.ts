import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#030405",
        surface: "#0A0B0E",
        "surface-elevated": "#111318",
        muted: "#1A1D24",
        border: "#1F2329",
        accent: {
          DEFAULT: "#3B82F6",
          soft: "#2563EB",
          muted: "#1E40AF"
        },
        text: {
          primary: "#F8F9FA",
          secondary: "#D1D5DB",
          muted: "#9CA3AF",
          subtle: "#6B7280"
        }
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Inter",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ]
      },
      maxWidth: {
        "content": "75rem",
        "prose": "65ch"
      },
      letterSpacing: {
        tighter: "-0.03em",
        tight: "-0.02em",
        normal: "-0.01em"
      },
      fontSize: {
        "display": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "display-sm": ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }]
      }
    }
  },
  plugins: []
};

export default config;

