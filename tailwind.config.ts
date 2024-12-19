import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '390px',
      md: '834px',
      xl: '1440px',
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        primary: {
          light: 'hsl(var(--primary-light))',
        },
        secondary: 'hsl(var(--secondary))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
