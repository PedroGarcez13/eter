import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./lib/admin";
import { Header } from "./components/Header";
import { DemoBanner } from "./components/DemoBanner";
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { Admin } from "./pages/Admin";

export default function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <DemoBanner />
        <Header />
        <main className="max-w-5xl mx-auto px-5 py-7 pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vitrine" element={<Catalog />} />
            <Route path="/estoque" element={<Admin />} />
          </Routes>
        </main>
        <footer className="text-center py-8 text-brand-blue2 text-sm">
          Brechó Agostina • Rua de São Bento 233, Olinda — PE<br />
          <span className="font-script text-lg text-gold-2">feito com carinho ♡</span>
        </footer>
      </BrowserRouter>
    </AdminProvider>
  );
}
