import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        background: '#0a0a0a',
        text: {
          primary: '#e5e5e5',
          secondary: '#a3a3a3',
        },
        accent: '#4a9eff',
      },
    },
  },
  plugins: [],
};

export default config;
