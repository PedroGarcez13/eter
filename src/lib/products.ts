import { supabase, isSupabaseConfigured } from "./supabase";
import type { Product, ProductInput } from "../types";

/* ------------------------------------------------------------------ *
 *  Camada de acesso a dados.
 *  - Com Supabase configurado: usa o banco real (tabela `products`).
 *  - Sem configuração: usa um fallback em localStorage, pra o app
 *    funcionar em modo demonstração (igual ao protótipo).
 * ------------------------------------------------------------------ */

const TABLE = "products";
const LS_KEY = "agostina_demo_products";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function seed(): Product[] {
  const base: Omit<Product, "id" | "created_at">[] = [
    { name: "Vestido floral vintage", description: "Algodão leve, estampa de flores azuis.", category: "Vestidos", size: "M", price: 65, image_url: null, status: "available" },
    { name: "Blusa de linho creme", description: "Linho natural, manga bufante.", category: "Blusas", size: "P", price: 42, image_url: null, status: "available" },
    { name: "Calça jeans reta", description: "Cintura alta, lavagem média.", category: "Calças", size: "G", price: 58, image_url: null, status: "available" },
    { name: "Casaco de tricô azul", description: "Tricô macio cor cobalto.", category: "Casacos", size: "M", price: 79, image_url: null, status: "available" },
    { name: "Saia midi plissada", description: "Plissado dourado mostarda.", category: "Saias", size: "P", price: 48, image_url: null, status: "available" },
    { name: "Bolsa de palha", description: "Palha trançada à mão, peça única.", category: "Bolsas", size: "Único", price: 55, image_url: null, status: "sold" },
  ];
  return base.map((b) => ({ ...b, id: uid(), created_at: new Date().toISOString() }));
}

function lsRead(): Product[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw) as Product[];
  } catch { /* ignore */ }
  const seeded = seed();
  localStorage.setItem(LS_KEY, JSON.stringify(seeded));
  return seeded;
}

function lsWrite(items: Product[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

/** Lista produtos. `onlyAvailable` filtra os vendidos (vitrine pública). */
export async function listProducts(onlyAvailable = false): Promise<Product[]> {
  if (isSupabaseConfigured && supabase) {
    let query = supabase.from(TABLE).select("*").order("created_at", { ascending: false });
    if (onlyAvailable) query = query.eq("status", "available");
    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []) as Product[];
  }
  const items = lsRead().sort((a, b) => b.created_at.localeCompare(a.created_at));
  return onlyAvailable ? items.filter((p) => p.status === "available") : items;
}

export async function createProduct(input: ProductInput): Promise<void> {
  const payload = { ...input, status: input.status ?? "available" };
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from(TABLE).insert(payload);
    if (error) throw error;
    return;
  }
  const items = lsRead();
  items.push({ ...payload, id: uid(), created_at: new Date().toISOString() } as Product);
  lsWrite(items);
}

export async function updateProduct(id: string, input: Partial<ProductInput>): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from(TABLE).update(input).eq("id", id);
    if (error) throw error;
    return;
  }
  const items = lsRead().map((p) => (p.id === id ? { ...p, ...input } : p));
  lsWrite(items);
}

export async function deleteProduct(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from(TABLE).delete().eq("id", id);
    if (error) throw error;
    return;
  }
  lsWrite(lsRead().filter((p) => p.id !== id));
}

export async function setSold(id: string, sold: boolean): Promise<void> {
  return updateProduct(id, { status: sold ? "sold" : "available" });
}
