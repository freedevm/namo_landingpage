/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
theme: {
    extend: {
      colors: {

      },
      screens: {
        xs: "320px",
        sm: "361px",
        md: "481px",
        lg: "769px",
        xl: "1025px",
        "2xl": "1401px",
        "3xl": "1921px",
      },
    },
  },
  plugins: [],
}

