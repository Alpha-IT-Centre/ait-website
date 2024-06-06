module.exports = {
  content: ["./index.html", "./src/**/*.{gleam,mjs}"],
  theme: {
    extend: {
      spacing: {
        '8xl': '88rem',
      },
      colors: {
        lighter: "#EBEBEB",
        light: "#949494",
        mid: "#555555",
        dark: "#404042",
        darker: "#252525",
        brand: "#80699D",
        "brand-dark": "#422367"
      },
      fontFamily: {
        normal: "MontSerrat"
      }
    },
  },
  plugins: [],
};
