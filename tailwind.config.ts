import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dbsRed: "#C8102E",
        dbsRedDark: "#9A0C24",
        dbsRedLight: "#FFE5EA",
        dbsInk: "#1B1B1B",
        dbsGray: "#5A5A5A",
        dbsLine: "#E5E5E5",
        dbsSurface: "#FAFAFA",
        dbsAmber: "#E89500",
        dbsGreen: "#1F8A4C",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: "0 2px 12px rgba(0,0,0,0.06)",
        ring: "0 0 0 2px rgba(200,16,46,0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
