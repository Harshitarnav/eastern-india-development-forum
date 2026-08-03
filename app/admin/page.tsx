"use client";

import React, { useState } from "react";
import { useCMS } from "@/lib/cms-store";
import { Save, RefreshCw, Layers, ShieldCheck, FileText, CheckCircle, Sparkles } from "lucide-react";

export default function AdminCMSPage() {
  const { siteData, updateSiteData, resetToDefault, isCMSActive } = useCMS();
  const [activeTab, setActiveTab] = useState<"general" | "hero" | "stats" | "tenders">("general");

  const [formTagline, setFormTagline] = useState<string>(siteData.tagline);
  const [formEmail, setFormEmail] = useState<string>(siteData.email);
  const [formPhone, setFormPhone] = useState<string>(siteData.phone);
  const [formHeadline, setFormHeadline] = useState<string>(siteData.hero.headline);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteData({
      tagline: formTagline,
      email: formEmail,
      phone: formPhone,
      hero: {
        ...siteData.hero,
        headline: formHeadline,
      },
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Admin Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line bg-white p-6 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
              <Sparkles className="h-4 w-4" /> Live Content Management System
            </div>
            <h1 className="font-display text-3xl font-bold text-navy mt-1">EIDF Admin CMS Dashboard</h1>
            <p className="text-xs text-muted mt-1">
              Manage website copy, hero banners, tenders, contact info, and impact statistics in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isCMSActive && (
              <span className="rounded-full bg-emerald/10 px-3 py-1 text-xs font-bold text-emerald border border-emerald/20 flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5" /> CMS Active
              </span>
            )}
            <button
              onClick={resetToDefault}
              className="flex items-center gap-1.5 rounded-full border border-navy/20 bg-cream px-4 py-2 text-xs font-bold text-navy hover:bg-white cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Reset Default Data
            </button>
          </div>
        </div>

        {/* CMS Tab Bar */}
        <div className="flex border-b border-line mb-8 gap-2 overflow-x-auto pb-1 whitespace-nowrap scrollbar-none">
          {(["general", "hero", "stats", "tenders"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-xs font-bold capitalize transition-all border-b-2 cursor-pointer ${
                activeTab === tab
                  ? "border-navy text-navy font-extrabold"
                  : "border-transparent text-muted hover:text-navy"
              }`}
            >
              {tab} Settings
            </button>
          ))}
        </div>

        {/* CMS Editor Form */}
        <form onSubmit={handleSave} className="rounded-3xl border border-line bg-white p-8 shadow-xl space-y-6">
          {savedSuccess && (
            <div className="rounded-2xl bg-emerald/10 p-4 border border-emerald/30 text-xs font-bold text-emerald-dark flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> CMS changes saved successfully! Site content updated live.
            </div>
          )}

          {activeTab === "general" && (
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-navy">General Identity & Contact Settings</h3>
              <div>
                <label className="block text-xs font-bold text-navy mb-1">Site Tagline</label>
                <input
                  type="text"
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  className="w-full rounded-2xl border border-line p-3 text-xs text-navy focus:outline-none focus:border-gold"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy mb-1">Official Support Email</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full rounded-2xl border border-line p-3 text-xs text-navy focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy mb-1">Official Support Phone</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full rounded-2xl border border-line p-3 text-xs text-navy focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "hero" && (
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-navy">Hero Section Headline</h3>
              <div>
                <label className="block text-xs font-bold text-navy mb-1">Main Headline</label>
                <textarea
                  rows={3}
                  value={formHeadline}
                  onChange={(e) => setFormHeadline(e.target.value)}
                  className="w-full rounded-2xl border border-line p-3 text-xs text-navy focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-navy">Impact Counters Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {siteData.impactStats.map((st) => (
                  <div key={st.key} className="p-4 rounded-2xl bg-cream border border-line text-xs">
                    <div className="text-muted">{st.label}</div>
                    <div className="font-bold text-navy text-lg">{st.prefix}{st.value}{st.suffix}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "tenders" && (
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-navy">Active Tenders Count ({siteData.tenders.length})</h3>
              <div className="space-y-2">
                {siteData.tenders.map((t) => (
                  <div key={t.id} className="p-3 rounded-xl bg-cream border border-line text-xs flex justify-between">
                    <span className="font-bold text-navy">{t.tenderNo}: {t.title}</span>
                    <span className="text-emerald font-bold">{t.estimatedCost}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-line flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-full bg-navy px-8 py-3.5 text-xs font-bold text-white hover:bg-navy-light transition-colors shadow-lg cursor-pointer"
            >
              <Save className="h-4 w-4 text-gold" /> Save CMS Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
