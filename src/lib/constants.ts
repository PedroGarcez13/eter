export const CATEGORIES = [
  "Vestidos", "Blusas", "Camisas", "Calças", "Saias", "Shorts",
  "Casacos", "Acessórios", "Calçados", "Bolsas", "Outros",
] as const;

export const SIZES = ["PP", "P", "M", "G", "GG", "XG", "Único"] as const;

export function money(value: number): string {
  return "R$ " + Number(value).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
