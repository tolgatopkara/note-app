/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      width: {
        144: "36rem",
      },
      height: {
        144: "36rem",
        180: "45rem",
        200: "50rem",
        220: "55rem",
        240: "60rem",
      }
    },
  },
  plugins: [],
};
