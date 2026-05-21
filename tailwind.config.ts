import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bark: "#7C3AED",
        "bark-light": "#9061F9",
        "bark-dark": "#5B21B6",
        moss: "#2563EB",
        "moss-light": "#60A5FA",
        "moss-dark": "#1D4ED8",
        cream: "#0A0A1A",
        "cream-dark": "#0e0e22",
        tan: "#A78BFA",
        "tan-light": "#C4B5FD",
        field: "#04040F",
        "field-light": "#0A0A1A",
        parchment: "#111128",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["DM Sans", "sans-serif"],
        rustic: ["Merriweather", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
