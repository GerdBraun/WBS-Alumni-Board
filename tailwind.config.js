/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#d3231c",
          "base-100": "#ffffff"
        },
        dark: {
          "primary": "#541d6f",
          "base-100": "#1d232a"
        },
      },
    ],
  },
  plugins: [daisyui],
};
