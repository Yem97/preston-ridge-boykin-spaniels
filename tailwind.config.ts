import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bark:          "#4A1E08",
        "bark-light":  "#7A4A20",
        "bark-dark":   "#2A0E04",
        moss:          "#A85A10",
        "moss-light":  "#C47030",
        "moss-dark":   "#1E0A02",
        cream:         "#FDF5E8",
        "cream-dark":  "#EDE0C8",
        tan:           "#D4802A",
        "tan-light":   "#E8A050",
        field:         "#1E0A02",
        "field-light": "#2E1208",
        parchment:     "#FFF8EE",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans:    ["DM Sans", "sans-serif"],
        rustic:  ["Merriweather", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
