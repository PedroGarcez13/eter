import { isSupabaseConfigured } from "../lib/supabase";

export function DemoBanner() {
  if (isSupabaseConfigured) return null;
  return (
    <div className="bg-gold-2/90 text-brand-blue text-center text-sm font-medium py-2 px-4">
      Modo demonstração — os dados ficam só neste navegador. Configure o Supabase no arquivo <code>.env</code> para usar o banco real.
    </div>
  );
}
