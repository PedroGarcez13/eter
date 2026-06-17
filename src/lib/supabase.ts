import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** True quando as variáveis de ambiente do Supabase estão configuradas. */
export const isSupabaseConfigured = Boolean(url && anonKey);

/**
 * Cliente Supabase. Fica `null` enquanto as chaves não forem configuradas,
 * permitindo que o app rode em "modo demonstração" com dados locais.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null;
