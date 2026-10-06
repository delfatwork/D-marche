import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-light': '#FEF3C7',
        'primary': '#B45300',
        'primary-dark': '#92400E',
        'secondary-light': '#FED7AA',
        'secondary': '#F97316',
        'secondary-dark': '#9A3412',
        'success': '#10B981',
        'warning': '#EAB308',
        'danger': '#EF4444',
        'info': '#3B82F6',
        'neutral-50': '#FAFAF8',
        'neutral-100': '#F5F5F3',
        'neutral-200': '#E8E8E5',
        'neutral-600': '#57564F',
        'neutral-900': '#1A1915',
      },
      fontSize: {
        'xs': ['14px', '20px'],
        'sm': ['16px', '24px'],
        'base': ['18px', '28px'],
        'lg': ['20px', '30px'],
        'xl': ['24px', '36px'],
        '2xl': ['28px', '40px'],
        '3xl': ['32px', '44px'],
      },
      borderRadius: {
        'xs': '0.5rem',
        'sm': '0.75rem',
        'md': '1rem',
      },
      boxShadow: {
        'base': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 40px rgba(0, 0, 0, 0.2)',
        'xl': '0 20px 60px rgba(0, 0, 0, 0.3)',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [],
} satisfies Config;
