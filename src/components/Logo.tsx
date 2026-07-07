import logo from "../assets/eter-logo.jpeg";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} aria-label="Éter brechó — início" className="flex items-center">
      <img src={logo} alt="Éter brechó" className="h-11 w-auto rounded-lg shadow-softsm" />
    </button>
  );
}
