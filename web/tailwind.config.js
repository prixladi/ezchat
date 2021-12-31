module.exports = {
  mode: 'jit',
  important: true,
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xshort: { raw: '(max-height: 500px)' },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
