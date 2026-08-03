"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Send,
  CheckCircle,
  Upload,
  ShieldCheck,
  ArrowRight,
  FileText,
  MapPin,
  Building2,
} from "lucide-react";
import { PageHero, FieldLabel, fieldClass } from "@/components/ui";

export default function SubmitProposalPage() {
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [state, setState] = useState("Bihar");
  const [sector, setSector] = useState("Infrastructure");
  const [budget, setBudget] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        crumb="Home / Proposals"
        eyebrow="EIDF Project Facilitation Board"
        title="Submit a Development Proposal"
        description="Submit project proposals for infrastructure, renewable energy, skill centers, or agri-tech clusters across Eastern India to request capital facilitation, government clearances, and land allotment guidance."
        compact
      />

      <section className="px-4 py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.4fr_1fr]">
          {submitted ? (
            <div className="rounded-3xl border border-emerald/20 bg-white p-10 text-center shadow-xl md:p-12">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald/15 text-emerald">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h2 className="font-display text-3xl font-bold text-navy">
                Proposal Submitted Successfully
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                Your proposal has been logged with EIDF Facilitation Desk. Ref ID:{" "}
                <span className="font-mono font-bold text-gold">PROP-2026-9941</span>. An
                officer will get in touch within 2 business days.
              </p>
              <Link
                href="/investors"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-navy-light"
              >
                Explore Investment Zones <ArrowRight className="h-4 w-4 text-gold" />
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-3xl border border-line bg-white p-7 shadow-xl md:p-9"
            >
              <div className="mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gold">
                  Proposal Form
                </span>
                <h2 className="mt-1 font-display text-2xl font-bold text-navy">
                  Project details
                </h2>
              </div>

              <div>
                <FieldLabel>Project Title *</FieldLabel>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Multimodal Cold Storage Terminal at Muzaffarpur"
                  className={fieldClass}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel>Target State *</FieldLabel>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className={fieldClass}
                  >
                    <option value="Bihar">Bihar</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Odisha">Odisha</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Assam">Assam</option>
                    <option value="North East">North Eastern States</option>
                  </select>
                </div>

                <div>
                  <FieldLabel>Sector *</FieldLabel>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className={fieldClass}
                  >
                    <option value="Infrastructure">Infrastructure & Logistics</option>
                    <option value="Renewable Energy">Renewable Energy</option>
                    <option value="Manufacturing">Manufacturing & SEZ</option>
                    <option value="Skilling">Skill Academy</option>
                    <option value="AgriTech">Agri-Tech & Food Processing</option>
                  </select>
                </div>
              </div>

              <div>
                <FieldLabel>Estimated Budget (₹ Cr) *</FieldLabel>
                <input
                  type="text"
                  required
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. ₹45 Crores"
                  className={fieldClass}
                />
              </div>

              <div>
                <FieldLabel>Project Summary & Objectives *</FieldLabel>
                <textarea
                  rows={5}
                  required
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Detail key objectives, land requirement, job creation potential, and required state clearances..."
                  className={fieldClass}
                />
              </div>

              <div className="rounded-2xl border border-dashed border-line bg-cream p-8 text-center transition-colors hover:border-gold/40">
                <Upload className="mx-auto mb-2 h-7 w-7 text-gold" />
                <div className="text-sm font-semibold text-navy">
                  Upload Detailed Project Report
                </div>
                <div className="mt-1 text-xs text-muted">
                  DPR / Pitch Deck (PDF, Max 20MB)
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-navy py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-navy-light"
              >
                Submit Project Proposal to Board <Send className="h-4 w-4 text-gold" />
              </button>
            </form>
          )}

          {/* Side panel */}
          <div className="flex flex-col gap-5">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-deep via-navy to-slate-dark p-7 text-white shadow-xl">
              <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gold/15 blur-2xl" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-xl font-bold">What happens next?</h3>
              <ul className="space-y-3 text-sm text-white/75">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                  Desk reviews eligibility within 2 business days
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                  Matched with state cell & scheme incentives
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                  Facilitation for clearances and capital intros
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6 shadow-lg">
              <div className="mb-4 text-xs font-bold uppercase tracking-wider text-gold">
                Also Explore
              </div>
              <div className="space-y-3">
                {[
                  { href: "/investors", label: "Investment Zones", icon: Building2 },
                  { href: "/schemes", label: "Government Schemes", icon: FileText },
                  { href: "/tenders", label: "Tender Desk", icon: MapPin },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between rounded-2xl border border-line bg-cream px-4 py-3 text-sm font-semibold text-navy transition-all hover:border-gold/40 hover:bg-white"
                  >
                    <span className="flex items-center gap-2.5">
                      <item.icon className="h-4 w-4 text-gold" />
                      {item.label}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
