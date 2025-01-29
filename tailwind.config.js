/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{css,xml,html,vue,svelte,ts,tsx}'],
  // use the .ns-dark class to control dark mode (applied by NativeScript) - since 'media' (default) is not supported.
  darkMode: ['class', '.ns-dark'],
  theme: {
    extend: {
      colors: {
        main_blue: "#2E6FF3",
        input_bg: "#ECF1FF",
        purple_box: "#CAD6FF",
        blue_text: "#2260FF",
        cancel_red: "#D50000",
        placeholder_grey: "#C4C4C4",
        main_text: "#33384B",
        secondary_text: "#475569",
        grey_text: "#AAB6C3"
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // disables browser-specific resets
  },
};
