module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      lobster: ['Lobster', 'cursive'],
    },
    extend: {
      keyframes: {
        'puff-in-center': {
          '0%': { opacity: 0, filter: 'blur(4px)' },
          '100%': { opacity: 1, filter: 'blur(0px)' },
        },
      },
      animation: {
        'puff-in-center':
          'puff-in-center 0.7s cubic-bezier(0.470, 0.000, 0.745, 0.715) both',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
};
