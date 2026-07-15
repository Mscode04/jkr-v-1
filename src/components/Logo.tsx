export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="flex flex-col leading-none">
        <span className="text-display text-xl font-bold tracking-tight text-foreground">JKR</span>
      </span>
    </span>
  );
}
