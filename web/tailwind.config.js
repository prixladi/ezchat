const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  important: true,
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xshort: { raw: '(max-height: 500px)' },
      '3xs': { raw: '(min-width: 300px)' },
      '2xs': { raw: '(min-width: 400px)' },
      xs: { raw: '(min-width: 500px)' },
      ...defaultTheme.screens,
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
