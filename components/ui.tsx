import Link from "next/link";
import { Sparkles } from "lucide-react";

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
      className={`relative overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-slate-dark text-white ${
        compact ? "px-4 py-16 md:py-20" : "px-4 py-20 md:py-28"
      }`}
    >
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-navy-mid/30 blur-[100px]" />
      <div className="pointer-events-none absolute top-8 right-8 h-56 w-56 rounded-full bg-gold/10 blur-[80px]" />
      <div className="pointer-events-none absolute bottom-8 left-8 h-64 w-64 rounded-full bg-emerald/10 blur-[90px]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-4 text-xs text-white/50 md:text-sm">{crumb}</div>

        {(eyebrow || crumb) && (
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gold shadow-lg backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            {eyebrow || crumb.split("/").pop()?.trim()}
          </div>
        )}

        <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
          {title}
        </h1>

        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
            {description}
          </p>
        )}

        {children && <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{children}</div>}
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
  return (
    <div
      className={`mb-2.5 text-xs font-bold uppercase tracking-[2px] text-gold ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
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
      <span
        className={`text-xs font-bold uppercase tracking-widest ${
          light ? "text-gold" : "text-gold"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-1 font-display text-3xl font-bold md:text-4xl ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mx-auto mt-3 max-w-2xl text-sm leading-relaxed ${
            light ? "text-white/70" : "text-muted"
          } ${align === "left" ? "mx-0" : ""}`}
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
      className={`flex items-center justify-center bg-[repeating-linear-gradient(45deg,oklch(93%_0.01_85),oklch(93%_0.01_85)_10px,oklch(96%_0.008_85)_10px,oklch(96%_0.008_85)_20px)] p-3 text-center font-mono text-[11px] text-muted ${className}`}
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
    <section className="relative overflow-hidden bg-gradient-to-r from-navy-deep via-navy to-slate-dark px-4 py-20 text-center text-white">
      <div className="pointer-events-none absolute top-0 right-1/4 h-48 w-48 rounded-full bg-gold/10 blur-[80px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-emerald/10 blur-[80px]" />

      <div className="relative mx-auto max-w-4xl space-y-6">
        <h2 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">{title}</h2>
        {description && (
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/75">{description}</p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href={primary.href}
            className="rounded-full bg-gold px-8 py-4 text-sm font-bold text-navy-deep shadow-2xl transition-transform hover:scale-105 hover:bg-gold-hover"
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/20"
            >
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
  "w-full rounded-2xl border border-line bg-cream px-4 py-3.5 text-sm text-navy outline-none transition focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/20";
