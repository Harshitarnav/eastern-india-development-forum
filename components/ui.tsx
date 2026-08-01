import Link from "next/link";

export function PageHero({
  crumb,
  title,
  compact = false,
}: {
  crumb: string;
  title: string;
  compact?: boolean;
}) {
  return (
    <section
      className={`flex flex-col items-center justify-center bg-navy px-6 text-center text-white ${
        compact ? "py-16 md:py-20" : "py-20 md:py-24"
      }`}
    >
      <div className="mb-2.5 text-xs text-white/75 md:text-sm">{crumb}</div>
      <h1 className="font-display text-3xl font-semibold md:text-4xl">{title}</h1>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2.5 text-xs font-bold tracking-[2px] text-gold-label">
      {children}
    </div>
  );
}

export function PlaceholderMedia({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center bg-[repeating-linear-gradient(45deg,oklch(93%_0.01_85),oklch(93%_0.01_85)_10px,oklch(96%_0.008_85)_10px,oklch(96%_0.008_85)_20px)] p-3 text-center font-mono text-[11px] text-muted ${className}`}
    >
      {label}
    </div>
  );
}

export function CtaBand({
  title,
  primary,
  secondary,
}: {
  title: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-navy-deep px-6 py-16 text-center md:py-20">
      <h2 className="mx-auto mb-6 max-w-xl font-display text-2xl text-white md:text-3xl">
        {title}
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href={primary.href}
          className="rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-navy-deep transition-opacity hover:opacity-90"
        >
          {primary.label}
        </Link>
        {secondary && (
          <Link
            href={secondary.href}
            className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold"
          >
            {secondary.label}
          </Link>
        )}
      </div>
    </section>
  );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-xs text-muted">{children}</label>;
}

export const fieldClass =
  "w-full rounded-lg border border-line-strong bg-white px-3.5 py-3 text-sm outline-none transition focus:border-navy";
