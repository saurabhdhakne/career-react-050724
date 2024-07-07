const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...colors,
        'primary':'#1E90FF',
        'primary-dark':'#2C2C2C',
        'primary-dark-2':'#1E1E1E',
        'primary-dark-3':'#444444'
      },
    },
  },
  plugins: [],
};
