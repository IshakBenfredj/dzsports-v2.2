/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    container:{
      center: true
    },
    colors : {
      main : 'rgb(0, 150, 136)',
    },
    extend: {},
  },
  plugins: [require('flowbite/plugin'),
            require('tailwindcss-rtl'),
          ],
}