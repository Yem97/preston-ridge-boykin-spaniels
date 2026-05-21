import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bark: "#2D6A4F",
        "bark-light": "#52B788",
        "bark-dark": "#1D4F38",
        moss: "#52B788",
        "moss-light": "#74C69D",
        "moss-dark": "#2D6A4F",
        cream: "#FAFAF5",
        "cream-dark": "#F2EDE4",
        tan: "#52B788",
        "tan-light": "#D8F3DC",
        field: "#1A1A1A",
        "field-light": "#2A2A2A",
        parchment: "#F2EDE4",
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
