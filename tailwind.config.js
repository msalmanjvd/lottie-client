module.exports = {
  purge: ["./components/**/*.tsx", "./pages/**/*.tsx", "./public/**/*.html"], //add this line
  darkMode: false, // or 'media' or 'class'
  theme: {
    // colors: {
    //   main: "#0FCCCE",
    // },
    extend: {
      colors: {
        main: "#0FCCCE",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
