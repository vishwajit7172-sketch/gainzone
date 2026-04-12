/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        lime: {
          400: '#C8F03A',
          500: '#A8D020',
        },
        zinc: {
          850: '#1a1a1a',
          950: '#0a0a0a',
        }
      }
    },
  },
  plugins: [],
}
