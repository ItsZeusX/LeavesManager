import { server } from "typescript";

/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["poppins", "sans-serif"],
      },
      colors: {
        secondary: {
          DEFAULT: "#84cc16",
          foreground: "#84cc16",
        },
      },
    },
  },

  darkMode: "class",
  plugins: [nextui()],
};
