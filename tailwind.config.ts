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
        morado: "#4C1A57",
        morado1: "#180421",
        verde: "#00A8AA",
        claro1: "#74839b",
        claro2: "#7a8ea1",
        claro3: "#a9b6c3",
        boton: "#3C949E",
        boton2: "#024F55"
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
