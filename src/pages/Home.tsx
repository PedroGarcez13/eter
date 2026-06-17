import { useNavigate } from "react-router-dom";
import { Hanger, Sun, Church } from "../components/icons";

function InfoCard({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div className="card-surface p-4 flex gap-3 items-center text-left">
      <div className="shrink-0 w-9 h-9 text-brand-blue">{children}</div>
      <div>
        <div className="font-display text-sm text-gold-2 tracking-wide">{label}</div>
        <div className="font-semibold text-brand-blue">{value}</div>
      </div>
    </div>
  );
}

export function Home() {
  const navigate = useNavigate();
  return (
    <section>
      <div className="relative overflow-hidden bg-cream border-[3px] border-brand-blue rounded-xl2 px-7 pt-10 pb-8 text-center shadow-soft">
        <Sun className="absolute top-4 right-6 w-14 text-gold" />
        <Church className="absolute right-4 bottom-1 w-20 text-brand-blue opacity-90" />

        <div className="font-display text-5xl md:text-6xl text-brand-blue leading-none">
          Agostina <span className="align-top text-base bg-gold rounded-lg px-2 py-0.5">233</span>
        </div>
        <div className="text-gold-2 my-3 font-bold tracking-widest">⟡ ⟡ ⟡</div>
        <h2 className="font-display text-gold-2 text-2xl md:text-3xl tracking-wide">VENHA NOS VISITAR!</h2>
        <p className="font-script text-2xl text-brand-blue2 mt-1">moda com história, garimpada com carinho</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto my-7">
          <InfoCard label="DATAS" value="06/06 e 07/06">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
          </InfoCard>
          <InfoCard label="HORÁRIO" value="09h às 15h">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
          </InfoCard>
          <InfoCard label="LOCAL" value="Rua de São Bento 233, Olinda">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
          </InfoCard>
        </div>

        <button className="btn" onClick={() => navigate("/vitrine")}>Ver a vitrine →</button>
        <div className="font-script text-2xl text-brand-blue mt-6 flex items-center justify-center gap-2">
          <Hanger className="w-6 h-6" /> esperamos por você!
        </div>
      </div>
    </section>
  );
}
