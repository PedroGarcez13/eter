import { useEffect, useState, useCallback } from "react";
import { Navigate } from "react-router-dom";
import type { Product, ProductInput } from "../types";
import { listProducts, createProduct, updateProduct, deleteProduct, setSold } from "../lib/products";
import { money } from "../lib/constants";
import { ProductCard } from "../components/ProductCard";
import { ProductForm } from "../components/ProductForm";
import { useAdmin } from "../lib/admin";

function Stat({ k, value, gold }: { k: string; value: string; gold?: boolean }) {
  return (
    <div className={`card-surface p-4 ${gold ? "bg-gold" : ""}`}>
      <div className="text-xs font-semibold text-brand-blue2 uppercase tracking-wide">{k}</div>
      <div className="font-display text-3xl text-brand-blue mt-1.5 leading-none">{value}</div>
    </div>
  );
}

export function Admin() {
  const { admin, loading: authLoading } = useAdmin();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    listProducts(false).then(setProducts).catch(console.error).finally(() => setLoading(false));
  }, []);

  useEffect(() => { reload(); }, [reload]);

  if (authLoading) {
    return <p className="text-center text-brand-blue2 py-16 font-script text-2xl">verificando acesso...</p>;
  }
  if (!admin) return <Navigate to="/" replace />;

  const available = products.filter((p) => p.status === "available");
  const sold = products.filter((p) => p.status === "sold");
  const valAvailable = available.reduce((s, p) => s + Number(p.price || 0), 0);
  const valSold = sold.reduce((s, p) => s + Number(p.price || 0), 0);

  async function handleSave(input: ProductInput) {
    if (editing) await updateProduct(editing.id, input);
    else await createProduct(input);
    reload();
  }

  async function handleRemove(p: Product) {
    if (confirm(`Remover "${p.name}" do estoque?`)) { await deleteProduct(p.id); reload(); }
  }

  async function handleToggle(p: Product) {
    await setSold(p.id, p.status !== "sold"); reload();
  }

  return (
    <section>
      <h2 className="font-display text-3xl text-brand-blue">Estoque</h2>
      <p className="font-script text-2xl text-brand-blue2 mb-5">gerencie as peças do brechó</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <Stat k="Peças disponíveis" value={String(available.length)} />
        <Stat k="Valor em estoque" value={money(valAvailable)} gold />
        <Stat k="Peças vendidas" value={String(sold.length)} />
        <Stat k="Total vendido" value={money(valSold)} />
      </div>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <h3 className="font-display text-2xl text-brand-blue">Todas as peças</h3>
        <button className="btn btn-blue btn-sm" onClick={() => { setEditing(null); setFormOpen(true); }}>
          + Cadastrar nova peça
        </button>
      </div>

      {loading ? (
        <p className="text-center text-brand-blue2 py-16 font-script text-2xl">carregando...</p>
      ) : products.length === 0 ? (
        <div className="text-center py-16 text-brand-blue2">
          <div className="font-script text-3xl mb-1">estoque vazio</div>
          cadastre a primeira peça ✦
        </div>
      ) : (
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} admin
              onEdit={(prod) => { setEditing(prod); setFormOpen(true); }}
              onToggleSold={handleToggle}
              onRemove={handleRemove} />
          ))}
        </div>
      )}

      <ProductForm open={formOpen} editing={editing}
        onClose={() => setFormOpen(false)} onSave={handleSave} />
    </section>
  );
}
