module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: ['./src/**/*.tsx'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
