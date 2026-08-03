"use client";

import React, { useState } from "react";
import {
  Save,
  RefreshCw,
  CheckCircle,
  Sparkles,
  Layers,
  FileText,
  BarChart3,
  Settings,
} from "lucide-react";
import { useCMS } from "@/lib/cms-store";
import { PageHero, FieldLabel, fieldClass } from "@/components/ui";

export default function AdminCMSPage() {
  const { siteData, updateSiteData, resetToDefault, isCMSActive } = useCMS();
  const [activeTab, setActiveTab] = useState<"general" | "hero" | "stats" | "tenders">(
    "general"
  );

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

  const tabs = [
    { id: "general" as const, label: "General", icon: Settings },
    { id: "hero" as const, label: "Hero", icon: Sparkles },
    { id: "stats" as const, label: "Stats", icon: BarChart3 },
    { id: "tenders" as const, label: "Tenders", icon: FileText },
  ];

  return (
    <>
      <PageHero
        crumb="Home / Admin"
        eyebrow="Live Content Management"
        title="EIDF Admin CMS Dashboard"
        description="Manage website copy, hero banners, tenders, contact info, and impact statistics in real-time."
        compact
      />

      <section className="px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Status bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line bg-white p-5 shadow-xl md:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-lg font-bold text-navy">Content Workspace</div>
                <div className="text-xs text-muted">
                  Changes apply live across the public site
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isCMSActive && (
                <span className="flex items-center gap-1 rounded-full border border-emerald/20 bg-emerald/10 px-3 py-1.5 text-xs font-bold text-emerald">
                  <CheckCircle className="h-3.5 w-3.5" /> CMS Active
                </span>
              )}
              <button
                onClick={resetToDefault}
                className="flex cursor-pointer items-center gap-1.5 rounded-full border border-navy/15 bg-cream px-4 py-2.5 text-xs font-bold text-navy transition-colors hover:bg-white"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Reset Default Data
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto rounded-2xl border border-line bg-white p-2 shadow-md">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex cursor-pointer items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-navy text-gold shadow-md"
                    : "text-muted hover:bg-cream hover:text-navy"
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label} Settings
              </button>
            ))}
          </div>

          {/* Editor Form */}
          <form
            onSubmit={handleSave}
            className="space-y-6 rounded-3xl border border-line bg-white p-7 shadow-xl md:p-9"
          >
            {savedSuccess && (
              <div className="flex items-center gap-2 rounded-2xl border border-emerald/30 bg-emerald/10 p-4 text-xs font-bold text-emerald-dark">
                <CheckCircle className="h-4 w-4" /> CMS changes saved successfully! Site
                content updated live.
              </div>
            )}

            {activeTab === "general" && (
              <div className="space-y-5">
                <h3 className="font-display text-xl font-bold text-navy">
                  General Identity & Contact Settings
                </h3>
                <div>
                  <FieldLabel>Site Tagline</FieldLabel>
                  <input
                    type="text"
                    value={formTagline}
                    onChange={(e) => setFormTagline(e.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <FieldLabel>Official Support Email</FieldLabel>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <FieldLabel>Official Support Phone</FieldLabel>
                    <input
                      type="text"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "hero" && (
              <div className="space-y-5">
                <h3 className="font-display text-xl font-bold text-navy">
                  Hero Section Headline
                </h3>
                <div>
                  <FieldLabel>Main Headline</FieldLabel>
                  <textarea
                    rows={3}
                    value={formHeadline}
                    onChange={(e) => setFormHeadline(e.target.value)}
                    className={fieldClass}
                  />
                </div>
              </div>
            )}

            {activeTab === "stats" && (
              <div className="space-y-5">
                <h3 className="font-display text-xl font-bold text-navy">
                  Impact Counters Overview
                </h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {siteData.impactStats.map((st) => (
                    <div
                      key={st.key}
                      className="rounded-2xl border border-line bg-cream p-4 text-xs transition-all hover:border-gold/30 hover:shadow-md"
                    >
                      <div className="text-muted">{st.label}</div>
                      <div className="mt-1 font-display text-lg font-bold text-navy">
                        {st.prefix}
                        {st.value}
                        {st.suffix}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "tenders" && (
              <div className="space-y-5">
                <h3 className="font-display text-xl font-bold text-navy">
                  Active Tenders ({siteData.tenders.length})
                </h3>
                <div className="space-y-3">
                  {siteData.tenders.map((t) => (
                    <div
                      key={t.id}
                      className="flex flex-col justify-between gap-2 rounded-2xl border border-line bg-cream p-4 text-xs sm:flex-row sm:items-center"
                    >
                      <span className="font-bold text-navy">
                        <span className="font-mono text-gold">{t.tenderNo}</span>: {t.title}
                      </span>
                      <span className="shrink-0 font-bold text-emerald">{t.estimatedCost}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end border-t border-line pt-5">
              <button
                type="submit"
                className="flex cursor-pointer items-center gap-2 rounded-full bg-navy px-8 py-3.5 text-xs font-bold text-white shadow-lg transition-colors hover:bg-navy-light"
              >
                <Save className="h-4 w-4 text-gold" /> Save CMS Changes
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
