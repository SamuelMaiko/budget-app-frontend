/** @type {import('tailwindcss').Config} */
import { keepTheme } from "keep-react/keepTheme";
import { nextui } from "@nextui-org/react";

const config = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        openSans: ["Open Sans", "serif"],
        Montserrat: ["Montserrat", "serif"],
      },
      colors: {
        primaryColor: "#F39C12", // Adding a custom blue color
        customBlue: "#1E40AF", // Adding a custom blue color
        customGreen: {
          light: "#6EE7B7", // Custom green with light and dark shades
          DEFAULT: "#10B981", // Default shade of custom green
          dark: "#047857",
        },
      },
      // You can now use these in your classes like bg-customBlue, text-customGreen-light, bg-customGreen-dark, etc.
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default keepTheme(config);
