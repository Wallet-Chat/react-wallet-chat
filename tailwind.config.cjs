/** @type {import('tailwindcss').Config} */
module.exports = {
  jit: true,
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      dropShadow: {
        widget: '4px 4px 8px rgba(0,0,0,0.5)',
      },
      zIndex: {
        1000: 1000,
      },
      transitionProperty: {
        grow: 'width, min-width, height, min-height',
        'swap-icon': 'transform, opacity',
      },
      transitionDuration: {
        250: '250ms',
      },
      rotate: {
        30: '30deg',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
