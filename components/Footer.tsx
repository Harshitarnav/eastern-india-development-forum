"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Mail, Phone, Loader2 } from "lucide-react";
import { usePublicNav, usePublicSite } from "@/lib/cms/public-provider";
import { sanitizeTel } from "@/lib/utils";

export const Footer: React.FC = () => {
  const site = usePublicSite();
  const footerLinks = usePublicNav("footer");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

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
          message: "Please add this email to monthly EIDF briefings on RFPs, investment policy, and project milestones.",
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
    <footer className="border-t border-white/10 bg-navy-deep text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white p-0.5 shadow-md ring-2 ring-gold/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={site.logo || "/images/logo.png"}
                  alt="EIDF"
                  className="h-full w-full rounded-full object-contain"
                />
              </span>
              <span className="font-display text-base font-extrabold leading-tight">
                {site.name}
              </span>
            </div>
            <p className="text-sm text-white/55 leading-relaxed mb-5 max-w-sm">
              {site.tagline}
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span>{site.headquarters}</span>
              </div>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Mail className="h-4 w-4 text-emerald shrink-0" />
                {site.email}
              </a>
              <a
                href={`tel:${sanitizeTel(site.phone)}`}
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Phone className="h-4 w-4 text-amber shrink-0" />
                {site.phone}
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-gold mb-4">Explore</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-white/60">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-gold mb-4">Briefings</h4>
            <p className="text-sm text-white/55 leading-relaxed mb-4">
              Monthly updates on RFPs, investment policy, and project milestones.
            </p>
            {status === "done" ? (
              <p className="rounded-lg border border-emerald/30 bg-emerald/10 px-4 py-3 text-sm text-emerald">
                You&apos;re subscribed. We&apos;ll be in touch.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Professional email"
                  disabled={status === "loading"}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/35 focus:border-gold focus:outline-none disabled:opacity-60"
                />
                {error && <p className="text-xs text-red-300">{error}</p>}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary !rounded-lg w-full !py-3 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Subscribing…
                    </span>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/admin/login" className="hover:text-gold text-gold/80">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
