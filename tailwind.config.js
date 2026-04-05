/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FDF8F3',
        champagne: '#C9A962',
        'champagne-light': '#E8D5A3',
        blush: '#E8B4B8',
        'blush-soft': '#F5D0D4',
        maroon: '#5C1A1B',
        'maroon-deep': '#3D1213',
        beige: '#F0E6DC',
        'beige-warm': '#E5D5C8',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out infinite 1s',
        glow: 'glow 4s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        maroon: '0 25px 50px -12px rgba(92, 26, 27, 0.22)',
        'maroon-sm': '0 10px 30px -8px rgba(92, 26, 27, 0.14)',
        'maroon-xs': '0 4px 20px -4px rgba(92, 26, 27, 0.08)',
      },
    },
  },
  plugins: [],
}
