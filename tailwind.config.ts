import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#0b0b0b',
        text: {
          primary: '#eaeaea',
          secondary: '#a1a1aa',
        },
        accent: '#3b82f6',
      },
      maxWidth: {
        content: '720px',
      },
    },
  },
  plugins: [],
};

export default config;
