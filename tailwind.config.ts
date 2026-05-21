import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bark: "#3D1F0A",
        "bark-light": "#6B3515",
        "bark-dark": "#1A0D05",
        moss: "#B57C10",
        "moss-light": "#E8A020",
        "moss-dark": "#8A5C08",
        cream: "#FAF4EA",
        "cream-dark": "#F2E8D5",
        tan: "#E8A020",
        "tan-light": "#FDF3DC",
        field: "#1A0D05",
        "field-light": "#3D1F0A",
        parchment: "#F2E8D5",
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
