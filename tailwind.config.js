/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aura': {
          'bg': '#F6F0E8',
          'bg2': '#F4EDE3',
          'bg3': '#EFE6D8',
          'dark': '#3B2F2A',
          'darker': '#2E2520',
          'accent': '#B86F52',
          'accent2': '#A65A42',
          'muted': '#8C7B74',
          'light': '#D4C4B8',
        }
      },
      fontFamily: {
        'display': ['Cormorant Garamond', 'serif'],
        'heading': ['Playfair Display', 'serif'],
        'body': ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.9s ease-out',
        'slide-up-delay': 'slideUp 0.9s ease-out 0.2s both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
