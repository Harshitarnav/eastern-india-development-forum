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
  Loader2,
} from "lucide-react";
import { PageHero, FieldLabel, fieldClass } from "@/components/ui";

export default function SubmitProposalPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [refId, setRefId] = useState("");
  const [title, setTitle] = useState("");
  const [state, setState] = useState("Bihar");
  const [sector, setSector] = useState("Infrastructure");
  const [budget, setBudget] = useState("");
  const [desc, setDesc] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [dprNote, setDprNote] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          state,
          sector,
          budget,
          summary: desc,
          contact_name: contactName,
          contact_email: contactEmail,
          contact_phone: contactPhone,
          dpr_note: dprNote || null,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Something went wrong.");
        setStatus("error");
        return;
      }
      setRefId(String(json.ref_id || ""));
      setStatus("done");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <>
      <PageHero
        crumb="Home / Proposals"
        eyebrow="EIDF Project Facilitation Board"
        title="Submit a Development Proposal"
        description="Submit project proposals for infrastructure, renewable energy, skill centers, or agri-tech clusters across Eastern India to request capital facilitation, government clearances, and land allotment guidance."
        compact
      />

      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.4fr_1fr]">
          {status === "done" ? (
            <div className="eidf-panel border-emerald/25 bg-white p-10 text-center md:p-12">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center border border-emerald/30 bg-emerald/10 text-emerald">
                <CheckCircle className="h-7 w-7" />
              </div>
              <h2 className="font-display text-3xl font-bold text-navy">
                Proposal Submitted Successfully
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                Your proposal has been logged with EIDF Facilitation Desk. Ref ID:{" "}
                <span className="font-mono font-bold text-gold">{refId}</span>. An
                officer will get in touch within 2 business days.
              </p>
              <Link href="/investors" className="btn-navy mt-8 inline-flex">
                Explore Investment Zones <ArrowRight className="h-4 w-4 text-gold" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="eidf-panel bg-white">
              <div className="border-b border-line px-6 py-6 md:px-8 md:py-7">
                <div className="flex items-center gap-3">
                  <span className="hidden h-px w-8 bg-gold sm:block" aria-hidden />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-label">
                    Proposal Form
                  </span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-navy">
                  Project details
                </h2>
              </div>

              <div className="space-y-7 px-6 py-7 md:px-8 md:py-8">
                <fieldset className="space-y-4">
                  <legend className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                    Project
                  </legend>
                  <div>
                    <FieldLabel>Project Title *</FieldLabel>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Multimodal Cold Storage Terminal at Muzaffarpur"
                      className={fieldClass}
                      disabled={status === "loading"}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <FieldLabel>Target State *</FieldLabel>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className={fieldClass}
                        disabled={status === "loading"}
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
                        disabled={status === "loading"}
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
                      disabled={status === "loading"}
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
                      disabled={status === "loading"}
                    />
                  </div>
                </fieldset>

                <fieldset className="space-y-4 border-t border-line pt-7">
                  <legend className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                    Contact
                  </legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <FieldLabel>Contact Name *</FieldLabel>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Primary contact"
                        className={fieldClass}
                        disabled={status === "loading"}
                      />
                    </div>
                    <div>
                      <FieldLabel>Contact Email *</FieldLabel>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="you@example.com"
                        className={fieldClass}
                        disabled={status === "loading"}
                      />
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Contact Phone (optional)</FieldLabel>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 ..."
                      className={fieldClass}
                      disabled={status === "loading"}
                    />
                  </div>
                </fieldset>

                <div className="border border-dashed border-line bg-cream/70 p-5 md:p-6">
                  <div className="flex items-start gap-3">
                    <Upload className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-navy">
                        Detailed Project Report
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-muted">
                        After submission, email your DPR / pitch deck (PDF, max 20MB) to the
                        facilitation desk with your Ref ID in the subject line.
                      </p>
                      <input
                        type="text"
                        value={dprNote}
                        onChange={(e) => setDprNote(e.target.value)}
                        placeholder="Optional note (e.g. DPR ready / will send by email)"
                        className={`${fieldClass} mt-3`}
                        disabled={status === "loading"}
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-navy flex w-full cursor-pointer disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-gold" /> Submitting…
                    </>
                  ) : (
                    <>
                      Submit Project Proposal to Board <Send className="h-4 w-4 text-gold" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="flex flex-col gap-5">
            <div className="relative overflow-hidden eidf-panel-dark p-7 text-white eidf-grain">
              <div className="pointer-events-none absolute inset-0 eidf-depth opacity-90" />
              <div className="relative">
                <div className="mb-4 flex h-11 w-11 items-center justify-center border border-gold/30 bg-gold/10 text-gold">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="mb-3 font-display text-xl font-bold">What happens next?</h3>
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
            </div>

            <div className="eidf-panel bg-white p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-6 bg-gold" aria-hidden />
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-label">
                  Also Explore
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { href: "/investors", label: "Investment Zones", icon: Building2 },
                  { href: "/schemes", label: "Government Schemes", icon: FileText },
                  { href: "/tenders", label: "Tender Desk", icon: MapPin },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between border border-line bg-cream/60 px-4 py-3 text-sm font-semibold text-navy transition-colors hover:border-gold/40 hover:bg-white"
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
