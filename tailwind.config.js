/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [],
  theme: {
    screens: {
      xs: '540px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      '2xl': '1920px',
    },
    extend: {
      container: {
        screens: {
          lg: '1024px',
          xl: '1440px',
          sxl: '1800px',
          '2xl': '1920px',
        },
      },
      colors: {
        primary: {
          DEFAULT: '#005096',
          medium: '#009fde',
          light: '#dbeeff',
        },
        secondary: {
          DEFAULT: '#d23c2d',
          light: '#faebea',
        },
        ecology: {
          DEFAULT: '#036579',
          light: '#d9f8fe',
        },
        society: {
          DEFAULT: '#8b0f77',
          light: '#fcdff7',
        },
        economy: {
          DEFAULT: '#f18a00',
          light: '#fff3e4',
        },
        green: {
          DEFAULT: '#34c17b',
          light: '#d5f4e5',
        },
        purple: {
          DEFAULT: '#8a0f76',
          light: '#fdeefa',
        },
        live: {
          DEFAULT: '#005096',
          light: '#dbeeff',
        },
      },
      fontSize: {
        headline: '4rem',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
    },
  },
}
