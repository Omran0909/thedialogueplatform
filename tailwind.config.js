/** @type {import('tailwindcss').Config} */
module.exports = {
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
        accent: "#0b3a5d",
        "accent-soft": "#e3edf5",
        warm: "#f2a33a",
        "warm-soft": "#fff1db",
      },
      maxWidth: {
        content: "1120px",
        prose: "760px",
      },
    },
  },
  plugins: [],
};
