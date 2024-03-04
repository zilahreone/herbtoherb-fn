/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontWeight: {
      thin: '100',
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    fontSize: {
      std: '0.95rem', 
      sm: '0.825rem',
      md: '1.0rem',
      base: '1.25rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    extend: {
      fontFamily: {
        sans: ['Noto Sans Thai', ...defaultTheme.fontFamily.sans],
        serif: ['Noto Sans Thai'],
        mono: ['Noto Sans Thai'],
        display : ['Noto Sans Thai'],
        body : ['Noto Sans Thai'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/container-queries')
  ],
}