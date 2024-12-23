/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', "ui-sans-serif", "system-ui"],
        fancy: ['"Dancing Script"', "cursive"],
      },
    },
  },
  plugins: [],
};
