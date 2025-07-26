module.exports = {
    content: [
      "./index.njk",
      "./components/**/*.njk",
      "./src/**/*.njk",
      "./src/**/*.html",
      "./_site/**/*.html"
    ],
    theme: { 
      extend: {
        fontFamily: {
          'sans': ['Satoshi', 'sans-serif'],
          'satoshi': ['Satoshi', 'sans-serif'],
        },
        colors: {
          primary: "#447DFC",
        }
      } 
    },
    plugins: [],
  };