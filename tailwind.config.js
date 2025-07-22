/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4ade80',
          DEFAULT: '#16a34a',
          dark: '#15803d',
        },
        secondary: {
          light: '#a16207',
          DEFAULT: '#854d0e',
          dark: '#713f12',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
