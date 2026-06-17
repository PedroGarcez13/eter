import { useEffect, useMemo, useState } from "react";
import type { Product } from "../types";
import { listProducts } from "../lib/products";
import { CATEGORIES, SIZES } from "../lib/constants";
import { ProductCard } from "../components/ProductCard";
import { useAdmin } from "../lib/admin";

export function Catalog() {
  const { admin } = useAdmin();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    listProducts(true)
      .then(setProducts)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return products.filter((p) => {
      if (q && !(`${p.name} ${p.description ?? ""}`.toLowerCase().includes(q))) return false;
      if (cat && p.category !== cat) return false;
      if (size && p.size !== size) return false;
      return true;
    });
  }, [products, search, cat, size]);

  return (
    <section>
      <h2 className="font-display text-3xl text-brand-blue">Vitrine</h2>
      <p className="font-script text-2xl text-brand-blue2 mb-5">peças disponíveis, garimpadas com carinho</p>

      <div className="card-surface p-3.5 flex gap-2.5 flex-wrap items-center mb-6">
        <input className="field-input flex-1 min-w-40" placeholder="🔎 Buscar peça..."
          value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="field-input w-auto" value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="">Todas as categorias</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select className="field-input w-auto" value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="">Todos os tamanhos</option>
          {SIZES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <span className="ml-auto font-semibold text-brand-blue2 text-sm">
          {filtered.length} {filtered.length === 1 ? "peça" : "peças"}
        </span>
      </div>

      {loading ? (
        <p className="text-center text-brand-blue2 py-16 font-script text-2xl">carregando...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-brand-blue2">
          <div className="font-script text-3xl mb-1">nenhuma peça encontrada</div>
          tente outra busca ou filtro ✦
        </div>
      ) : (
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]">
          {filtered.map((p) => <ProductCard key={p.id} product={p} admin={admin} />)}
        </div>
      )}
    </section>
  );
}
