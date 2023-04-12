const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
      colors: {
          'white': '#FFFFFF',
          'bulma-green': '#00d1b2',
      },
      textColors: {
          
      },
    extend: {
      backgroundImage: {
          
        },
        colors: {
          ...colors
        }
    },
  },
  plugins: [
    require('flowbite/plugin')
],
}