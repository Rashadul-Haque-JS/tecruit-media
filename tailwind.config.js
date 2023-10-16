module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        damion: ["Damion", "cursive"],
      },
      screens: {
        sm: { max: "767px" },
        md: { min: "768px", max: "1023px" },
        lg: { min: "1024px", max: "1279px" },
        xl: { min: "1280px", max: "1535px" },
        "2xl": { min: "1536px" },
        "3xl": { min: "1920px" },
        "4xl": { min: "2560px" },
      },
      boxShadow: {
        shade: "0px 0px 15px 0px rgba(0,0,0,0.1)",
      },
      colors: {
        tecruitPrimary: "#279b37",
        tecruitSecondary: "#ffffff",
        tecruitSpecial: "#1F2937",
        tecruitRedish: "#D61E27",
      },
    },
  },
  plugins: [],
};
