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
          "primary": "#c6152f",
          "base-100": "#ffffff"
        },
        dark: {
          "primary": "#882eb5",
          "base-100": "#1d232a"
        },
      },
    ],
  },
  plugins: [daisyui],
};
