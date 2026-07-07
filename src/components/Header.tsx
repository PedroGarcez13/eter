import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { Shield } from "./icons";
import { useAdmin } from "../lib/admin";
import { LoginModal } from "./LoginModal";

export function Header() {
  const { admin, usesAuth, signOut, toggleDemo } = useAdmin();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `font-semibold text-base px-4 py-2 rounded-full transition border-2 border-transparent ${
      isActive ? "bg-brand-blue text-cream" : "text-brand-blue hover:bg-brand-soft"
    }`;

  function handleAdminButton() {
    if (admin) {
      signOut();
      navigate("/");
    } else if (usesAuth) {
      setLoginOpen(true);
    } else {
      toggleDemo();
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b-[3px] border-brand-blue">
      <div className="max-w-5xl mx-auto px-5 py-3 flex items-center gap-4 flex-wrap">
        <Logo onClick={() => navigate("/")} />
        <nav className="flex gap-1.5 ml-auto flex-wrap items-center">
          <NavLink to="/" className={linkClass} end>Início</NavLink>
          <NavLink to="/vitrine" className={linkClass}>Vitrine</NavLink>
          {admin && <NavLink to="/estoque" className={linkClass}>Estoque</NavLink>}
          <button onClick={handleAdminButton}
            className={`font-semibold text-sm px-3.5 py-2 rounded-full border-2 flex items-center gap-1.5 transition ${
              admin ? "bg-gold border-brand-blue" : "border-brand-blue border-dashed text-brand-blue hover:bg-gold"
            }`}>
            <Shield className="w-4 h-4" />
            {admin ? "Sair" : usesAuth ? "Entrar (admin)" : "Modo admin"}
          </button>
        </nav>
      </div>

      {admin && (
        <div className="bg-brand-blue text-white text-center font-semibold text-sm py-1.5 tracking-wide">
          ✦ Modo admin ativo — você pode cadastrar, editar e remover peças ✦
        </div>
      )}

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
}
