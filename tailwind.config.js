/** @type {import('tailwindcss').Config} */
// Paleta "Éter" — dark fantasy: índigo profundo, névoa de roxo/azul/verde,
// âmbar mágico nos destaques. (Mantemos os nomes dos tokens.)
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: "#141327", 2: "#20203E" }, // fundo escuro / superfície secundária
        brand: { blue: "#7FC4A0", blue2: "#A98BE0", soft: "#332F5C" }, // verde-brilho / violeta / muted índigo
        gold: { DEFAULT: "#E7C97E", 2: "#D3AE55" }, // âmbar (botões, preços, destaques)
        ink: "#E9E6F5", // texto claro (lavanda)
        paper: "#211F40", // painel dos cards (índigo escuro)
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        script: ["'Parisienne'", "cursive"],
        body: ["'Nunito'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 34px rgba(0,0,0,.5)",
        softsm: "0 3px 16px rgba(0,0,0,.4)",
      },
      borderRadius: { xl2: "22px" },
    },
  },
  plugins: [],
};
