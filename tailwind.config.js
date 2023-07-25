/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./projects/web/src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
