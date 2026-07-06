import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "./supabase";

interface AuthCtx {
  /** True quando o usuário tem acesso de admin (logado no Supabase, ou toggle no modo demo). */
  admin: boolean;
  /** Ainda verificando a sessão inicial. */
  loading: boolean;
  /** True quando o login real (Supabase Auth) está ativo; false no modo demonstração. */
  usesAuth: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  /** Liga/desliga o admin no modo demonstração (sem Supabase). */
  toggleDemo: () => void;
}

const Ctx = createContext<AuthCtx>({
  admin: false,
  loading: false,
  usesAuth: false,
  signIn: async () => {},
  signOut: async () => {},
  toggleDemo: () => {},
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const usesAuth = isSupabaseConfigured;
  const [session, setSession] = useState<Session | null>(null);
  const [demoAdmin, setDemoAdmin] = useState(false);
  const [loading, setLoading] = useState(usesAuth);

  useEffect(() => {
    if (!usesAuth || !supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, [usesAuth]);

  async function signIn(email: string, password: string) {
    if (!supabase) throw new Error("Supabase não configurado.");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function signOut() {
    if (supabase) await supabase.auth.signOut();
    setDemoAdmin(false);
  }

  const admin = usesAuth ? Boolean(session) : demoAdmin;

  return (
    <Ctx.Provider
      value={{ admin, loading, usesAuth, signIn, signOut, toggleDemo: () => setDemoAdmin((v) => !v) }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useAdmin = () => useContext(Ctx);
