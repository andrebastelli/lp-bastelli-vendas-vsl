import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bastelli-navy': '#23384A',
        'bastelli-blue': '#1667A2',
        'bastelli-orange': '#EE733B',
        'bastelli-white': '#FFFFFF',
        'bastelli-ink': '#101923',
        'bastelli-paper': '#F6F4EF',
        'bastelli-line': '#E5E1D8',
      },
      fontFamily: {
        display: ['"Inter Tight"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Inter Tight"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
