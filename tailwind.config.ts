import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        charcoal: '#1a1a1a',
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E5C158',
          dark: '#B8941F',
        },
      },
    },
  },
  plugins: [],
}
export default config
