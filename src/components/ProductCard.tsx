import type { Product } from "../types";
import { money } from "../lib/constants";
import { Hanger } from "./icons";

interface Props {
  product: Product;
  admin?: boolean;
  onEdit?: (p: Product) => void;
  onToggleSold?: (p: Product) => void;
  onRemove?: (p: Product) => void;
}

export function ProductCard({ product, admin, onEdit, onToggleSold, onRemove }: Props) {
  return (
    <div className="card-surface overflow-hidden flex flex-col transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[3/4] bg-cream-2 flex items-center justify-center overflow-hidden">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <Hanger className="w-16 text-brand-blue opacity-30" />
        )}
        <span className="absolute top-2.5 left-2.5 bg-gold text-[#141327] font-bold text-xs px-2.5 py-0.5 rounded-full">
          {product.category}
        </span>
        {product.status === "sold" && (
          <div className="absolute inset-0 bg-brand-blue/60 flex items-center justify-center font-display text-2xl text-gold -rotate-6">
            VENDIDA
          </div>
        )}
      </div>

      <div className="p-3.5 flex flex-col gap-1.5 flex-1">
        <div className="font-semibold text-lg text-brand-blue leading-tight">{product.name}</div>
        <div className="text-sm text-ink/60 flex-1">{product.description}</div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-xs font-semibold text-brand-blue2 bg-brand-soft px-2.5 py-0.5 rounded-full">
            Tam. {product.size}
          </span>
          <span className="font-display text-xl text-gold-2">{money(product.price)}</span>
        </div>

        {admin && (
          <div className="flex gap-1.5 flex-wrap mt-2.5 pt-2.5 border-t border-dashed border-brand-soft">
            <button onClick={() => onEdit?.(product)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border-[1.5px] border-brand-blue text-brand-blue hover:bg-brand-soft transition">
              ✎ Editar
            </button>
            <button onClick={() => onToggleSold?.(product)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border-[1.5px] border-gold-2 text-gold-2 hover:bg-[#fcefd2] transition">
              {product.status === "sold" ? "↩ Disponível" : "✓ Vendida"}
            </button>
            <button onClick={() => onRemove?.(product)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border-[1.5px] border-[#c0392b] text-[#c0392b] hover:bg-[#fbe5e2] transition">
              🗑 Remover
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
