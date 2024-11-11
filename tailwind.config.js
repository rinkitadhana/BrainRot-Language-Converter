/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bricolage: ["Bricolage Grotesque", "sans-serif"],
      },
      colors: {
        pur: "#804B71",
        neon: "#C6E597",
      },
    },
  },
  plugins: [],
}
