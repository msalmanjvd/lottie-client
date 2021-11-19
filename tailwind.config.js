module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      main: "#0FCCCE",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
