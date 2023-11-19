/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html"],
  theme: {
    extend: {
      colors: {
        'light-green': '#bbf7e8',
        'light-blue': '#e4f1f9',
        'light-brown': '#fbf6e4',
        'dark': '#18191c',
        'primary': '#0797ce'
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'Verdana', 'Tahoma', 'sans-serif'],
        'sans': ['Noto Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}

