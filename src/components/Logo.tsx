export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center">
        <svg
          viewBox="0 0 40 40"
          className="absolute inset-0 h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="6" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <path
            d="M11 29 L20 11 L29 29 M14.5 23 H25.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.85"
          />
          <circle cx="32.5" cy="7.5" r="1.2" fill="currentColor" opacity="0.4" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-display text-base tracking-tight text-foreground">Aflah C P</span>
        <span className="mt-1 font-mono text-[9px] tracking-[0.28em] text-muted-foreground">
          SALES · STRATEGY
        </span>
      </span>
    </span>
  );
}
