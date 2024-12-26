import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '390px',
      md: '834px',
      xl: '1400px',
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          light: 'hsl(var(--primary-light))',
        },
        accent: 'hsl(var(--accent))',
        secondary: 'hsl(var(--secondary))',
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        julius: ['var(--font-julius)', 'sans-serif'],
      },
      animation: {
        large: 'large 2.5s infinite',
        'large-2': 'large-2 2.5s infinite',
        small: 'small 2.5s infinite',
      },
      keyframes: {
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
        large: {
          '0%': {
            opacity: '0',
            transform: 'rotate(0deg) scale(0)',
          },
          '50%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
            transform: 'rotate(360deg) scale(1.5)',
          },
        },
        'large-2': {
          '0%': {
            opacity: '0',
            transform: 'rotate(45deg) scale(0)',
          },
          '50%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
            transform: 'rotate(405deg) scale(1.1)',
          },
        },
        small: {
          '0%': {
            opacity: '0',
            transform: 'rotate(0deg) scale(0)',
          },
          '50%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
            transform: 'rotate(-360deg) scale(1.5)',
          },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
