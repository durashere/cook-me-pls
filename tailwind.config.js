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
      borderRadius: {
        '4xl': '2rem',
      },
      spacing: {
        '1/3': '33.333333%',
        '2/3': '66.666667%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};
