module.exports = {
    content: [
      "./index.njk",
      "./components/**/*.njk",
      "./src/**/*.njk",
      "./src/**/*.html",
      "./_site/**/*.html"
    ],
    safelist: [
      'rounded-xl',
      'rounded-2xl', 
      'rounded-3xl',
      'rounded-full',
      'bg-gradient-to-b',
      'bg-gradient-to-t',
      'bg-gradient-to-l',
      'bg-gradient-to-r',
      'from-[#EEF4FF]',
      'to-white',
      'h-[80vh]',
      'h-[100vh]',
      'font-jakarta'
    ],
    theme: { 
      extend: {
        screens: {
          'xs': '321px', // Custom breakpoint
        },
        fontFamily: {
          'sans': ['Satoshi', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
          'satoshi': ['Satoshi', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
          'jakarta': ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        },
        colors: {
          primary: "#447DFC",
        }
      } 
    },
    plugins: [],
  };