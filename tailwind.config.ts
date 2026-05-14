import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bark: "#5C3D1E",
        "bark-light": "#8B6340",
        "bark-dark": "#3B2510",
        moss: "#4A6741",
        "moss-light": "#7A9B71",
        "moss-dark": "#2D4228",
        cream: "#F5EDD6",
        "cream-dark": "#E8D9B8",
        tan: "#C49A5A",
        "tan-light": "#DFC08A",
        field: "#1C2B1A",
        "field-light": "#243622",
        parchment: "#FDF6E3",
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
