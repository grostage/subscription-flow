/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gym-vibe palette — Orange & Red
        primary: {
          DEFAULT: '#F97316', // Energetic orange
          light: '#FB923C',
          dark: '#EA580C',
        },
        secondary: {
          DEFAULT: '#DC2626', // Deep red
          light: '#EF4444',
          dark: '#B91C1C',
        },
        accent: {
          DEFAULT: '#FBBF24', // Yellow for contrast
          light: '#FCD34D',
        },
        dark: {
          DEFAULT: '#1C1917', // Warm dark (stone)
          lighter: '#292524',
          dark: '#0C0A09',
          darkest: '#080706',
        },
        brutal: {
          black: '#000000',
          white: '#FFFFFF',
        }
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-sm': '2px 2px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-lg': '6px 6px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-primary': '4px 4px 0px 0px #F97316',
        'brutal-secondary': '4px 4px 0px 0px #DC2626',
        'brutal-hover': '2px 2px 0px 0px rgba(0, 0, 0, 1)',
      },
      fontFamily: {
        'brutal': ['Space Grotesk', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
