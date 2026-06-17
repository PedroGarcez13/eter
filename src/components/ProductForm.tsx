import { useEffect, useState } from "react";
import type { Product, ProductInput } from "../types";
import { CATEGORIES, SIZES } from "../lib/constants";
import { resizeToDataUrl } from "../lib/image";
import { persistImage } from "../lib/upload";

interface Props {
  open: boolean;
  editing: Product | null;
  onClose: () => void;
  onSave: (input: ProductInput) => Promise<void>;
}

export function ProductForm({ open, editing, onClose, onSave }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [size, setSize] = useState<string>(SIZES[2]);
  const [price, setPrice] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setName(editing.name);
      setDescription(editing.description ?? "");
      setCategory(editing.category);
      setSize(editing.size);
      setPrice(String(editing.price));
      setPreview(editing.image_url);
    } else {
      setName(""); setDescription(""); setCategory(CATEGORIES[0]);
      setSize(SIZES[2]); setPrice(""); setPreview(null);
    }
  }, [open, editing]);

  if (!open) return null;

  async function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try { setPreview(await resizeToDataUrl(file)); }
    catch { alert("Não consegui carregar essa imagem."); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      let imageUrl = preview;
      if (preview && preview.startsWith("data:")) imageUrl = await persistImage(preview);
      await onSave({
        name: name.trim(),
        description: description.trim() || null,
        category, size,
        price: parseFloat(price) || 0,
        image_url: imageUrl,
      });
      onClose();
    } catch (err) {
      alert("Erro ao salvar: " + (err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-brand-blue/45 flex items-center justify-center z-50 p-5"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-cream border-[3px] border-brand-blue rounded-xl2 w-full max-w-lg max-h-[90vh] overflow-auto shadow-soft p-6">
        <h3 className="font-display text-2xl text-brand-blue">
          {editing ? "Editar peça" : "Cadastrar nova peça"}
        </h3>
        <p className="font-script text-xl text-brand-blue2 mb-4">preencha os dados da roupa</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <label className="block">
            <span className="font-semibold text-sm text-brand-blue">Foto da peça</span>
            <div className="mt-1 border-2 border-dashed border-brand-blue rounded-xl p-3.5 text-center bg-paper cursor-pointer hover:bg-brand-soft transition relative">
              <input type="file" accept="image/*" onChange={onPhoto}
                className="absolute inset-0 opacity-0 cursor-pointer" />
              {preview ? (
                <img src={preview} alt="" className="max-h-44 mx-auto object-contain rounded-lg" />
              ) : (
                <span className="text-brand-blue2 text-sm">📷 Clique para escolher uma foto (opcional)</span>
              )}
            </div>
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-semibold text-sm">Nome da peça *</span>
            <input className="field-input" required value={name}
              onChange={(e) => setName(e.target.value)} placeholder="Ex.: Vestido floral vintage" />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-semibold text-sm">Descrição</span>
            <textarea className="field-input min-h-16 resize-y" value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tecido, estado de conservação..." />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-sm">Categoria *</span>
              <select className="field-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-sm">Tamanho *</span>
              <select className="field-input" value={size} onChange={(e) => setSize(e.target.value)}>
                {SIZES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-1">
            <span className="font-semibold text-sm">Preço (R$) *</span>
            <input className="field-input" type="number" min="0" step="0.01" required
              value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0,00" />
          </label>

          <div className="flex gap-2.5 justify-end mt-2">
            <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-sm" disabled={saving}>
              {saving ? "Salvando..." : "Salvar peça"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
