/** @type {import('tailwindcss').Config} */
import { colors } from "./constants/color";

module.exports = {
  darkMode: "class",
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: { ...colors },
    },
  },
  plugins: [],
};
