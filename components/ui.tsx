import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PageHero({
  crumb,
  title,
  description,
  compact = false,
  children,
}: {
  crumb: string;
  title: string;
  description?: string;
  /** @deprecated Pills removed — kept for call-site compatibility */
  eyebrow?: string;
  compact?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={`relative overflow-hidden text-white ${
        compact ? "px-4 py-12 md:py-14" : "px-4 py-14 md:py-20"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-mid" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-emerald/10 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-4 text-[11px] tracking-wide text-white/40">{crumb}</div>
        <h1 className="max-w-3xl font-display text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl md:text-[2.75rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 md:text-[15px]">
            {description}
          </p>
        )}
        {children && (
          <div className="mt-7 flex flex-wrap items-center gap-3">{children}</div>
        )}
      </div>
    </section>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`section-eyebrow mb-2.5 ${className}`}>{children}</div>;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <div className={`mb-10 ${align === "center" ? "text-center" : "text-left"}`}>
      <div
        className={`inline-flex items-center gap-3 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span
          className={`hidden h-px w-8 sm:block ${light ? "bg-gold/60" : "bg-gold"}`}
          aria-hidden
        />
        <span
          className={`text-[11px] font-bold uppercase tracking-[0.16em] ${
            light ? "text-gold" : "text-gold-label"
          }`}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        className={`mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 max-w-2xl text-sm leading-relaxed md:text-[15px] ${
            light ? "text-white/65" : "text-muted"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
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
      className={`flex items-center justify-center bg-[repeating-linear-gradient(45deg,#eef3f8,#eef3f8_10px,#f7f9fc_10px,#f7f9fc_20px)] p-3 text-center font-mono text-[11px] text-muted ${className}`}
    >
      {label}
    </div>
  );
}

export function CtaBand({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden px-4 py-16 text-white md:py-20">
      <div className="absolute inset-0 bg-navy-deep" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald/10 via-transparent to-gold/10" />

      <div className="relative mx-auto max-w-7xl flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="text-sm leading-relaxed text-white/65 md:text-[15px]">
              {description}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link href={primary.href} className="btn-primary">
            {primary.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
          {secondary && (
            <Link href={secondary.href} className="btn-secondary">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-xs font-bold text-navy">{children}</label>
  );
}

export const fieldClass =
  "w-full rounded-lg border border-line bg-white px-4 py-3.5 text-sm text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20";

export function AdminFieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-xs font-bold text-[var(--admin-text)]">
      {children}
    </label>
  );
}

export const adminFieldClass =
  "w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-4 py-3.5 text-sm text-[var(--admin-text)] outline-none transition placeholder:text-[var(--admin-muted)] focus:border-gold focus:ring-2 focus:ring-[var(--admin-ring)]";
