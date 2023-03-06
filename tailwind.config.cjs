/** @type {import('tailwindcss').Config} */
module.exports = {
  jit: true,
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      zIndex: {
        1000: 1000,
      },
      transitionProperty: {
        grow: 'width, min-width, height, min-height',
        'swap-icon': 'transform, opacity',
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
