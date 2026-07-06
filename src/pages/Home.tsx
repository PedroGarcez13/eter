import { useNavigate } from "react-router-dom";

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0c.6 6.3 5.7 11.4 12 12-6.3.6-11.4 5.7-12 12-.6-6.3-5.7-11.4-12-12C6.3 11.4 11.4 6.3 12 0z" />
    </svg>
  );
}

function Moon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M15 2a10 10 0 1 0 7 17A8 8 0 0 1 15 2z" />
    </svg>
  );
}

export function Home() {
  const navigate = useNavigate();
  return (
    <section>
      <div className="relative overflow-hidden bg-cream border-[3px] border-brand-blue rounded-xl2 px-7 pt-16 pb-14 text-center shadow-soft">
        <Sparkle className="absolute top-10 left-10 w-6 text-gold-2 opacity-70" />
        <Sparkle className="absolute top-24 right-16 w-4 text-brand-blue2 opacity-60" />
        <Sparkle className="absolute bottom-16 left-20 w-5 text-gold opacity-60" />
        <Sparkle className="absolute bottom-28 right-12 w-3 text-brand-blue2 opacity-70" />
        <Moon className="absolute top-8 right-9 w-11 text-gold opacity-70" />

        <div className="font-script text-[3.5rem] md:text-7xl text-brand-blue leading-none">Éter</div>
        <div className="font-body text-xs md:text-sm tracking-[0.5em] uppercase text-gold-2 mt-2 ml-[0.5em]">
          brechó
        </div>

        <p className="font-display italic text-2xl md:text-3xl text-brand-blue2 mt-7 max-w-xl mx-auto">
          peças com alma, garimpadas como quem colhe estrelas
        </p>
        <p className="font-body text-ink/75 max-w-md mx-auto mt-4">
          roupas de brechó escolhidas a dedo — cada uma com sua própria história,
          esperando encontrar você.
        </p>

        <button className="btn mt-9" onClick={() => navigate("/vitrine")}>
          Explorar a vitrine →
        </button>

        <div className="font-script text-3xl text-brand-blue mt-9">até logo, viajante ✦</div>
      </div>
    </section>
  );
}
