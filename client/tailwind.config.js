/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "28.5px"],
      lg: ["18px", "21.94px"],
      xl: ["20px", "24.38px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["28px", "50px"],
      "4xl": ["40px", "58px"],
      "8xl": ["65px", "78px"],
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        // DARK MODE
        primary: "#101624", // primary
        "white-primary": "#edf0f1", // font highlight
        "cyber-blue": "#0088a9", // font description
        "slate-gray": "#6D6D6D",
        "pale-blue": "#141b2d", // secondary
        "white-400": "rgba(255, 255, 255, 0.80)", // white optional

        // LIGHT MODE
        "light-primary": "#ffffff", // light bg-primary
        "white-second": "#F5F5F5", // light secondary bg
        "slate-blue": "#685CFE", // highlights
        "black-text": "#000000",
      },
      boxShadow: {
        "dark-3xl": "0 0 50px rgba(0, 0, 0, 0.8)",
        "light-3xl": "0 0 20px rgba(0, 0, 0, 0.8)",
      },
      screens: {
        wide: "1440px",
      },
    },
  },
  plugins: [],
};
