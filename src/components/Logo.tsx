import { Hanger } from "./icons";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2">
      <Hanger className="w-7 h-7 text-brand-blue" />
      <span className="font-display text-2xl text-brand-blue leading-none">Agostina</span>
      <span className="bg-gold text-brand-blue font-bold text-xs rounded-lg px-1.5 -translate-y-1.5">
        233
      </span>
    </button>
  );
}
