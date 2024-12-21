import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
  	screens: {
  		sm: '390px',
  		md: '834px',
  		xl: '1440px'
  	},
  	container: {
  		center: true
  	},
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			primary: {
  				light: 'hsl(var(--primary-light))'
  			},
  			secondary: 'hsl(var(--secondary))',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
