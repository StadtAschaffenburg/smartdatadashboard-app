/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'xs': '540px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1440px',
      '2xl': '1920px',
    },
    extend: {
      container: {
        screens: {
          'lg': '1024px',
          'xl': '1440px',
          // 'xl' : '1024px',
          '2xl': '1920px',
        },
      },
      colors: {
        primary: {
          DEFAULT: '#005096',
          light: '#dbeeff',
        },
        secondary: {
          DEFAULT: '#d23c2d',
          light: '#faebea',
        },
        climate: {
          DEFAULT: '#009fde',
          light: '#e2f6ff',
        },
        mobility: {
          DEFAULT: '#008838',
          light: '#ecfff4',
        },
        energy: {
          DEFAULT: '#f28b00',
          light: '#fff3e4',
        },
        buildings: {
          DEFAULT: '#8a0f76',
          light: '#fdeefa',
        },
      },
    },
  },
}
