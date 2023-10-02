module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"], 
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
    },
    screens: {
      sm: { max: "767px" },
      md: { min: "768px", max: "1023px" },
      lg: { min: "1024px", max: "1279px" },
      xl: { min: "1280px" },
    },
    plugins: [],
  },
};