/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "gradient-reverse": {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
      
   
   
      },
      animation: {
        "gradient-reverse": "gradient-reverse 4s ease-in-out infinite",
       
      },
    },
  },
  plugins: [require('tailwindcss-textshadow'),],
};
