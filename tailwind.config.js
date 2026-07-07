/** @type {import('tailwindcss').Config} */
// Paleta "Éter" — claro: fundo magenta suave, verde-musgo nos botões e detalhes.
// (Mantemos os nomes dos tokens; "brand.blue" e "gold" são tons de musgo; "cream" é o magenta claro do fundo.)
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: "#F3DAE8", 2: "#ECCADE" }, // fundo magenta claro
        brand: { blue: "#6F7F3E", blue2: "#5E6E32", soft: "#E6E9D0" }, // verde-musgo (detalhes/bordas) + chip pálido
        gold: { DEFAULT: "#7C8C46", 2: "#66772F" }, // musgo (botões, preços, etiquetas)
        ink: "#3E2236", // texto escuro (ameixa)
        paper: "#FCF4F8", // superfície dos cards (quase branco rosado)
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        script: ["'Parisienne'", "cursive"],
        body: ["'Nunito'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 26px rgba(80,40,70,.16)",
        softsm: "0 3px 12px rgba(80,40,70,.12)",
      },
      borderRadius: { xl2: "22px" },
    },
  },
  plugins: [],
};
