import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
import postcssimport from "postcss-import";
module.exports = {
  plugins: {
    postcssimport,
    tailwindcss: { tailwind },
    autoprefixer: { autoprefixer },
  },
};
