/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f0f14',
        surface: '#16161e',
        'surface-offset': '#1e1e28',
        primary: '#6366f1',
        'primary-hover': '#818cf8',
        secondary: '#8b5cf6',
        tertiary: '#a855f7',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
