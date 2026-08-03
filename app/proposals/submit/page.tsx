"use client";

import React, { useState } from "react";
import { Send, CheckCircle, Upload, ShieldCheck } from "lucide-react";

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
    <div className="min-h-screen bg-cream py-16 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 rounded-3xl border border-line bg-gradient-to-br from-navy-deep via-navy to-slate-dark text-white p-8 md:p-12 shadow-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">
            EIDF PROJECT FACILITATION BOARD
          </span>
          <h1 className="font-display text-4xl font-extrabold text-white">
            Submit a Development Proposal
          </h1>
          <p className="text-sm text-white/80 max-w-xl leading-relaxed">
            Submit project proposals for infrastructure, renewable energy, skill centers, or agri-tech clusters across Eastern India to request capital facilitation, government clearances, and land allotment guidance.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-3xl border border-line bg-white p-12 shadow-xl text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald/20 text-emerald-dark">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h2 className="font-display text-3xl font-bold text-navy">Proposal Submitted Successfully</h2>
            <p className="text-xs text-muted max-w-md mx-auto">
              Your proposal has been logged with EIDF Facilitation Desk. Ref ID: <span className="font-mono font-bold text-gold">PROP-2026-9941</span>. An officer will get in touch within 2 business days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-3xl border border-line bg-white p-8 shadow-xl space-y-6">
            <div>
              <label className="block text-xs font-bold text-navy mb-1">Project Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Multimodal Cold Storage Terminal at Muzaffarpur"
                className="w-full rounded-2xl border border-line p-3 text-xs text-navy focus:outline-none focus:border-gold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy mb-1">Target State *</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full rounded-2xl border border-line p-3 text-xs text-navy focus:outline-none focus:border-gold bg-white"
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
                <label className="block text-xs font-bold text-navy mb-1">Sector *</label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full rounded-2xl border border-line p-3 text-xs text-navy focus:outline-none focus:border-gold bg-white"
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
              <label className="block text-xs font-bold text-navy mb-1">Estimated Budget (₹ Cr) *</label>
              <input
                type="text"
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. ₹45 Crores"
                className="w-full rounded-2xl border border-line p-3 text-xs text-navy focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy mb-1">Project Summary & Objectives *</label>
              <textarea
                rows={4}
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Detail key objectives, land requirement, job creation potential, and required state clearances..."
                className="w-full rounded-2xl border border-line p-3 text-xs text-navy focus:outline-none focus:border-gold"
              />
            </div>

            <div className="rounded-2xl border border-dashed border-line bg-cream p-6 text-center text-xs text-muted">
              <Upload className="h-6 w-6 text-gold mx-auto mb-2" />
              <span>Upload Detailed Project Report (DPR) / Pitch Deck (PDF, Max 20MB)</span>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-full bg-navy py-4 text-xs font-bold text-white hover:bg-navy-light transition-colors shadow-lg cursor-pointer"
            >
              Submit Project Proposal to Board <Send className="h-4 w-4 text-gold" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
