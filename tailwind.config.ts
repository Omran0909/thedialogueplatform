import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Avenir Next", "Avenir", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
        heading: ["Iowan Old Style", "Palatino Linotype", "Palatino", "Book Antiqua", "serif"],
      },
      colors: {
        background: "#f4f1ea",
        surface: "#fffcf7",
        line: "#ddd5c7",
        text: {
          primary: "#1f2a30",
          secondary: "#52616a",
        },
        accent: "#0f4c5c",
        "accent-soft": "#d9ebe7",
      },
      maxWidth: {
        content: "1120px",
        prose: "760px",
      },
    },
  },
  plugins: [],
};

export default config;
