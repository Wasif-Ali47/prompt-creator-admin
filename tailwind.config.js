/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: '#3e7b6f',
          mid: '#5a9e90',
          light: '#7dc2b3',
          pale: '#e6f4f1',
          ghost: '#f2faf8',
        },
        teal: {
          DEFAULT: '#1f5f6e',
          mid: '#2d7d8f',
        },
        sky: '#eaf5f8',
        amber: {
          DEFAULT: '#b87a0a',
          pale: '#fdf3dc',
        },
        rose: {
          DEFAULT: '#b83a42',
          light: '#fca5a5',
        },
        violet: {
          DEFAULT: '#5b4fcf',
          pale: '#efedfd',
        },
        panel: {
          DEFAULT: '#111821',
          border: '#1f2a36',
        },
        surface: '#050b10',
        muted: '#7a9bad',
        s400: '#94a3b8',
      },
      width: {
        68: '17rem',
      },
      boxShadow: {
        soft: '0 22px 60px rgba(0, 0, 0, 0.65)',
      },
      fontFamily: {
        serif: ["'Instrument Serif'", 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
