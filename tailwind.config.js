/** @type {import('tailwindcss').Config} */
// Paleta "Éter" — etérea: verde-sálvia/floresta, fundo enevoado e creme suave.
// (Mantemos os nomes dos tokens; os valores foram trocados para o novo tema.)
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: "#DCE7D4", 2: "#CAD9C2" }, // fundo enevoado (sálvia claro)
        brand: { blue: "#3E6B2F", blue2: "#5C8A46", soft: "#DEE9D5" }, // verdes (o "azul" da marca agora é verde)
        gold: { DEFAULT: "#B8A94E", 2: "#8F8130" }, // dourado-oliva suave (acentos, preços)
        ink: "#33512A", // texto verde-floresta profundo
        paper: "#F6F8F0", // superfície dos cards (quase branco esverdeado)
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        script: ["'Parisienne'", "cursive"],
        body: ["'Nunito'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 28px rgba(51,81,42,.16)",
        softsm: "0 3px 12px rgba(51,81,42,.12)",
      },
      borderRadius: { xl2: "22px" },
    },
  },
  plugins: [],
};
