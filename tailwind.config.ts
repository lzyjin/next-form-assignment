import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      }
    },
  },
  // darkMode: ['selector', '[data-mode="dark"]'],
  darkMode: ["selector"],
  plugins: [],
};
export default config;
