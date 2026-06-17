import { createContext, useContext, useState, type ReactNode } from "react";

interface AdminCtx { admin: boolean; toggle: () => void; }
const Ctx = createContext<AdminCtx>({ admin: false, toggle: () => {} });

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState(false);
  return <Ctx.Provider value={{ admin, toggle: () => setAdmin((v) => !v) }}>{children}</Ctx.Provider>;
}

export const useAdmin = () => useContext(Ctx);
