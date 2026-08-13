import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PageHero({
  crumb,
  title,
  description,
  eyebrow,
  compact = false,
  children,
}: {
  crumb: string;
  title: string;
  description?: string;
  eyebrow?: string;
  compact?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={`relative overflow-hidden text-white eidf-grain ${
        compact ? "px-4 py-14 md:py-16" : "px-4 py-16 md:py-24"
      }`}
    >
      <div className="absolute inset-0 eidf-depth" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(232,163,23,0.04)_50%,transparent_100%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-5 text-[11px] font-medium tracking-[0.12em] uppercase text-white/35">
          {crumb}
        </div>
        {eyebrow && (
          <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
            {eyebrow}
          </div>
        )}
        <h1 className="max-w-4xl font-display text-display-fluid font-extrabold text-white">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">
            {description}
          </p>
        )}
        {children && (
          <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>
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
  className = "",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`mb-10 md:mb-12 ${align === "center" ? "text-center" : "text-left"} ${className}`}>
      <div
        className={`inline-flex items-center gap-3 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span
          className={`hidden h-px w-10 sm:block ${light ? "bg-gold/60" : "bg-gold"}`}
          aria-hidden
        />
        <span
          className={`text-[11px] font-bold uppercase tracking-[0.18em] ${
            light ? "text-gold" : "text-gold-label"
          }`}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        className={`mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem] ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-sm leading-relaxed md:text-[15px] ${
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
    <section className="relative overflow-hidden px-4 py-20 text-white md:py-24 eidf-grain">
      <div className="absolute inset-0 eidf-depth" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald/10 via-transparent to-gold/10" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-4">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="text-sm leading-relaxed text-white/65 md:text-[15px]">
              {description}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link href={primary.href} className="btn-primary" data-cursor="VIEW">
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

export function FieldLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.08em] text-navy/80"
    >
      {children}
    </label>
  );
}

export const fieldClass =
  "w-full rounded border border-line bg-cream/50 px-4 py-3.5 text-sm text-navy outline-none transition placeholder:text-muted/65 hover:border-navy/25 focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/20 disabled:cursor-not-allowed disabled:opacity-60";

export function AdminFieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-xs font-bold text-[var(--admin-text)]">
      {children}
    </label>
  );
}

export const adminFieldClass =
  "w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-4 py-3.5 text-sm text-[var(--admin-text)] outline-none transition placeholder:text-[var(--admin-muted)] focus:border-gold focus:ring-2 focus:ring-[var(--admin-ring)]";
