"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUp, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { usePublicNav, usePublicSite } from "@/lib/cms/public-provider";
import { sanitizeTel } from "@/lib/utils";

function SocialGlyph({ platform }: { platform: string }) {
  const key = platform.toLowerCase();
  const iconClass = "h-4 w-4";
  if (key.includes("linkedin")) {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor" aria-hidden>
        <path d="M4.98 3.5A2.5 2.5 0 1 1 2.5 6 2.5 2.5 0 0 1 4.98 3.5ZM3 8.75h3.96V21H3Zm7.08 0h3.8v1.67h.05c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.77 2.65 4.77 6.09V21h-3.96v-5.54c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.92V21H10.08Z" />
      </svg>
    );
  }
  if (key.includes("youtube")) {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor" aria-hidden>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.5 3.7 12 3.7 12 3.7s-7.5 0-9.4.38A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12c1.9.38 9.4.38 9.4.38s7.5 0 9.4-.38a3 3 0 0 0 2.1-2.12A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.75 15.57V8.43L15.84 12Z" />
      </svg>
    );
  }
  if (key.includes("facebook")) {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor" aria-hidden>
        <path d="M14.5 8.5V6.7c0-.7.5-1 1-1h2V2h-2.8C11.7 2 10 4 10 6.6v1.9H7.5V12H10v10h4.5V12H17l.5-3.5h-3Z" />
      </svg>
    );
  }
  if (key.includes("instagram")) {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor" aria-hidden>
        <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm8 1.8H8A3.2 3.2 0 0 0 4.8 8v8A3.2 3.2 0 0 0 8 19.2h8A3.2 3.2 0 0 0 19.2 16V8A3.2 3.2 0 0 0 16 4.8ZM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8ZM17.35 6.4a1.05 1.05 0 1 1-1.05 1.05 1.05 1.05 0 0 1 1.05-1.05Z" />
      </svg>
    );
  }
  if (key === "x" || key.includes("twitter")) {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor" aria-hidden>
        <path d="M18.9 2.25h3.27l-7.14 8.16L23.25 21.75h-6.27l-4.9-6.42-5.62 6.42H3.16l7.64-8.73L.75 2.25h6.43l4.43 5.86 5.29-5.86Zm-1.15 17.52h1.81L6.37 4.09H4.43l13.32 15.68Z" />
      </svg>
    );
  }
  return <span className="text-[11px] font-bold leading-none">{platform.slice(0, 1)}</span>;
}

export const Footer: React.FC = () => {
  const site = usePublicSite();
  const footerLinks = usePublicNav("footer");
  const portalLinks = usePublicNav("portal");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const logoSrc = site.logo || "/images/logo.png";
  const footerHrefs = new Set(footerLinks.map((link) => link.href));
  const extraPortalLinks = portalLinks.filter((link) => !footerHrefs.has(link.href));
  const social = (site.social || []).filter((item) => item.url);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: email.split("@")[0] || "Subscriber",
          email,
          subject: "Newsletter",
          message:
            "Please add this email to monthly EIDF briefings on RFPs, investment policy, and project milestones.",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Could not subscribe. Try again.");
        setStatus("error");
        return;
      }
      setEmail("");
      setStatus("done");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <footer className="relative overflow-hidden border-t border-gold/25 bg-black text-white eidf-grain">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gold/8 to-transparent" />
      <div className="pointer-events-none absolute -bottom-28 -right-8 hidden h-[22rem] w-[22rem] select-none opacity-[0.08] sm:block lg:h-[26rem] lg:w-[26rem]" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" className="h-full w-full object-contain" />
      </div>
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-8 md:px-6 md:pt-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="group inline-flex items-center" aria-label={site.name}>
              <span className="relative flex h-[5.5rem] w-[5.5rem] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1 ring-2 ring-gold shadow-[0_0_28px_-10px_rgba(201,168,75,0.7)] transition duration-300 group-hover:ring-gold-soft md:h-24 md:w-24">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoSrc}
                  alt={site.name}
                  className="h-full w-full rounded-full object-contain"
                />
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-300">
              {site.tagline}
            </p>
            {site.poweredBy && (
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-soft/80">
                {site.poweredBy.trim()}
              </p>
            )}

            <div className="mt-6 space-y-2.5 text-sm text-zinc-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{site.headquarters}</span>
              </div>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2.5 text-zinc-300 transition-colors hover:text-gold-soft"
              >
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                {site.email}
              </a>
              <a
                href={`tel:${sanitizeTel(site.phone)}`}
                className="flex items-center gap-2.5 text-zinc-300 transition-colors hover:text-gold-soft"
              >
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                {site.phone}
              </a>
            </div>

            {social.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {social.map((item) => (
                  <a
                    key={`${item.platform}-${item.url}`}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.platform}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-gold-soft/80 transition hover:border-gold hover:bg-gold hover:text-black"
                  >
                    <SocialGlyph platform={item.platform} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-5 font-display text-sm font-bold tracking-wide text-gold-soft">
              Forum
            </h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 transition-colors hover:text-gold-soft"
                  >
                    <span className="h-px w-3 bg-gold/50" aria-hidden />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {extraPortalLinks.length > 0 && (
            <div className="lg:col-span-2">
              <h4 className="mb-5 font-display text-sm font-bold tracking-wide text-gold-soft">
                Portals
              </h4>
              <ul className="space-y-3 text-sm text-zinc-400">
                {extraPortalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 transition-colors hover:text-gold-soft"
                    >
                      <span className="h-px w-3 bg-gold/50" aria-hidden />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="sm:col-span-2 lg:col-span-4">
            <h4 className="mb-4 font-display text-sm font-bold tracking-wide text-gold-soft">
              Briefings
            </h4>
            <p className="mb-4 text-sm leading-relaxed text-zinc-400">
              Monthly updates on RFPs, investment policy, and project milestones.
            </p>
            {status === "done" ? (
              <p className="rounded-lg border border-gold/35 bg-gold/10 px-4 py-3 text-sm text-gold-soft">
                You&apos;re subscribed. We&apos;ll be in touch.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Professional email"
                    disabled={status === "loading"}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-gold focus:ring-1 focus:ring-gold/40 disabled:opacity-60 sm:flex-1"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary shrink-0 !rounded-lg !px-5 !py-3 disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Subscribing…
                      </span>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>
                {error && <p className="text-xs text-red-400">{error}</p>}
              </form>
            )}
            <Link
              href="/membership"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold transition hover:text-gold-soft"
            >
              Join the network
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative mt-14 border-t border-gold/35 bg-zinc-950">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 pb-24 text-sm text-zinc-200 md:px-6 lg:flex-row lg:pb-5 lg:pr-56">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span className="font-medium text-zinc-100">
              © {new Date().getFullYear()} {site.name}
            </span>
            {site.regNo && <span className="text-xs text-zinc-400">CIN {site.regNo}</span>}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="font-medium text-zinc-200 transition hover:text-gold-soft">
              Privacy
            </Link>
            <Link href="/terms" className="font-medium text-zinc-200 transition hover:text-gold-soft">
              Terms
            </Link>
            <Link href="/admin/login" className="font-medium text-gold transition hover:text-gold-soft">
              Admin
            </Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 font-medium text-zinc-200 transition hover:text-gold"
              aria-label="Back to top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
