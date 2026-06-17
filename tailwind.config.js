/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: "#FBF1D8", 2: "#F5E7C4" },
        brand: { blue: "#14387F", blue2: "#2D5BB8", soft: "#E6ECF7" },
        gold: { DEFAULT: "#F2B23E", 2: "#F4A92B" },
        ink: "#14387F",
        paper: "#FFFDF6",
      },
      fontFamily: {
        display: ["'Permanent Marker'", "cursive"],
        script: ["'Caveat'", "cursive"],
        body: ["'Fredoka'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 24px rgba(20,56,127,.12)",
        softsm: "0 3px 10px rgba(20,56,127,.10)",
      },
      borderRadius: { xl2: "22px" },
    },
  },
  plugins: [],
};
