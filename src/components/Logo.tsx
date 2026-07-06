export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex items-end gap-1.5 leading-none">
      <span className="font-script text-3xl md:text-4xl text-brand-blue leading-[0.8]">Éter</span>
      <span className="font-body text-[0.62rem] tracking-[0.3em] uppercase text-gold-2 pb-1">
        brechó
      </span>
    </button>
  );
}
