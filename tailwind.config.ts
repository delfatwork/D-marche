import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-light': '#FEF3C7',
        'primary': '#D97706',
        'primary-dark': '#92400E',
        'secondary-light': '#FED7AA',
        'secondary': '#F97316',
        'secondary-dark': '#9A3412',
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
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [],
} satisfies Config;
