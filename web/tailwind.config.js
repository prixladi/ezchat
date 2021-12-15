module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: ['./src/**/*.tsx'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xshort: { raw: '(max-height: 500px)' },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
