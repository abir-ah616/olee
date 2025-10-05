/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        glow: {
          50: '#fef3ff',
          100: '#fde6ff',
          200: '#fbcdff',
          300: '#f8a4ff',
          400: '#f26bff',
          500: '#e839ff',
          600: '#d117f5',
          700: '#b00cd1',
          800: '#900daa',
          900: '#780f89',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(232, 57, 255, 0.3)',
        'glow': '0 0 20px rgba(232, 57, 255, 0.4)',
        'glow-lg': '0 0 30px rgba(232, 57, 255, 0.5)',
        'glow-xl': '0 0 40px rgba(232, 57, 255, 0.6)',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'fly-in': 'flyIn 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        flyIn: {
          '0%': { transform: 'translate(100vw, -100vh) rotate(45deg) scale(0)', opacity: '0' },
          '100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(232, 57, 255, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(232, 57, 255, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};
