import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        plomo: "#C2C2C2",
        plomoClaro: "#CCCCCC",
      },
      backgroundImage: {
        banner: "url('/home/assets/bg.jpg')",
      },
      boxShadow: {
        light: "0px 4px 30px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
