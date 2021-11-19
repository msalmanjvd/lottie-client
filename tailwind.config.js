module.exports = {
  purge: ["./components/**/*.tsx", "./pages/**/*.tsx", "./public/**/*.html"], //add this line
  darkMode: false, // or 'media' or 'class'
  theme: {
    // colors: {
    //   main: "#0FCCCE",
    // },
    textColor: (theme) => theme("colors"),
    textColor: {
      main: "#0FCCCE",
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      main: "#0FCCCE",
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
