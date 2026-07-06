import { useState } from "react";
import { useAdmin } from "../lib/admin";
import { Shield } from "./icons";

export function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { signIn } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await signIn(email.trim(), password);
      setEmail("");
      setPassword("");
      onClose();
    } catch {
      setError("E-mail ou senha incorretos.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-brand-blue/45 flex items-center justify-center z-50 p-5"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-cream border-[3px] border-brand-blue rounded-xl2 w-full max-w-sm shadow-soft p-6">
        <div className="flex items-center gap-2 text-brand-blue">
          <Shield className="w-6 h-6" />
          <h3 className="font-display text-2xl">Acesso do admin</h3>
        </div>
        <p className="font-script text-xl text-brand-blue2 mb-4">entre para gerenciar o estoque</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-sm">E-mail</span>
            <input className="field-input" type="email" required autoFocus value={email}
              onChange={(e) => setEmail(e.target.value)} placeholder="voce@exemplo.com" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-sm">Senha</span>
            <input className="field-input" type="password" required value={password}
              onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </label>

          {error && <p className="text-sm text-[#c0392b] font-medium">{error}</p>}

          <div className="flex gap-2.5 justify-end mt-2">
            <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-sm" disabled={busy}>
              {busy ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
