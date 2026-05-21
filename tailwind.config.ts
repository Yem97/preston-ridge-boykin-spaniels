import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bark: "#B8622C",
        "bark-light": "#C97A44",
        "bark-dark": "#7A3A15",
        moss: "#5C3A1E",
        "moss-light": "#7A5232",
        "moss-dark": "#3A2010",
        cream: "#F5EFE0",
        "cream-dark": "#EDE5D0",
        tan: "#D4956A",
        "tan-light": "#E8C4A0",
        field: "#2D2D2D",
        "field-light": "#3D3D3D",
        parchment: "#EDE5D0",
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
