import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#050608",
        surface: "#0B0D12",
        muted: "#1A1D24",
        border: "#1F2933",
        accent: {
          DEFAULT: "#38BDF8",
          soft: "#0EA5E9"
        },
        text: {
          primary: "#F9FAFB",
          secondary: "#D1D5DB",
          muted: "#9CA3AF"
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
        "content": "75rem"
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em"
      }
    }
  },
  plugins: []
};

export default config;

