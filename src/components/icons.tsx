export function Hanger({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6a2 2 0 1 1 1.7 1.98c-.4.07-.7.42-.7.84V10" />
      <path d="M13 9.5 3.5 16.2c-.9.64-.45 2.05.65 2.05h15.7c1.1 0 1.55-1.41.65-2.05L13 9.5z" />
    </svg>
  );
}

export function Sun({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor"
      strokeWidth={3} strokeLinecap="round">
      <circle cx="32" cy="32" r="11" />
      <path d="M32 4v8M32 52v8M4 32h8M52 32h8M11 11l6 6M47 47l6 6M53 11l-6 6M17 47l-6 6" />
    </svg>
  );
}

export function Church({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 90 70" fill="currentColor">
      <rect x="18" y="30" width="54" height="40" />
      <path d="M18 30 45 12l27 18z" />
      <rect x="40" y="2" width="10" height="14" />
      <rect x="43" y="-2" width="4" height="8" />
    </svg>
  );
}

export function Shield({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 4 5v6c0 5 3.5 8 8 11 4.5-3 8-6 8-11V5l-8-3z" />
    </svg>
  );
}
