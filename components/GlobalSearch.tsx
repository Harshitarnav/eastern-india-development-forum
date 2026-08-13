"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  FileText,
  Briefcase,
  Award,
  Building,
  ChevronRight,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { usePublicSite } from "@/lib/cms/public-provider";
import { useLenisLock } from "@/components/motion";

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const site = usePublicSite();
  const [query, setQuery] = useState("");
  useLenisLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  const qLower = query.toLowerCase().trim();

  const filteredProjects = site.projects.filter(
    (p) =>
      p.title.toLowerCase().includes(qLower) ||
      p.state.toLowerCase().includes(qLower) ||
      p.sector.toLowerCase().includes(qLower)
  );
  const filteredTenders = site.tenders.filter(
    (t) =>
      t.title.toLowerCase().includes(qLower) ||
      t.tenderNo.toLowerCase().includes(qLower) ||
      t.state.toLowerCase().includes(qLower)
  );
  const filteredSchemes = site.schemes.filter(
    (s) =>
      s.title.toLowerCase().includes(qLower) ||
      s.category.toLowerCase().includes(qLower)
  );
  const filteredReports = site.reports.filter(
    (r) =>
      r.title.toLowerCase().includes(qLower) ||
      r.category.toLowerCase().includes(qLower)
  );
  const filteredStates = site.statesData.filter(
    (st) =>
      st.name.toLowerCase().includes(qLower) ||
      st.badge.toLowerCase().includes(qLower)
  );

  const hasResults =
    filteredProjects.length > 0 ||
    filteredTenders.length > 0 ||
    filteredSchemes.length > 0 ||
    filteredReports.length > 0 ||
    filteredStates.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex items-stretch sm:items-start justify-center sm:pt-12 sm:px-4">
          <motion.button
            type="button"
            aria-label="Close search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-navy-deep/90 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Global search"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-full w-full sm:h-auto sm:max-h-[85vh] sm:max-w-3xl flex-col overflow-hidden border-y sm:border border-white/15 bg-navy-deep text-white shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5 bg-navy/80">
              <Search className="h-5 w-5 text-gold shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tenders, projects, schemes, reports, states…"
                className="flex-1 bg-transparent font-display text-lg md:text-xl text-white placeholder-white/35 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="border border-white/15 bg-white/5 p-2 text-white/60 hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-7">
              {!query.trim() ? (
                <div className="py-16 text-center">
                  <p className="font-display text-2xl font-bold text-white/20 mb-3">
                    Search the ecosystem
                  </p>
                  <p className="text-xs text-white/45 max-w-md mx-auto leading-relaxed">
                    Query projects, tenders, schemes, reports, and states — e.g. Skill, Solar,
                    Bihar, Tender.
                  </p>
                </div>
              ) : !hasResults ? (
                <div className="py-16 text-center text-sm text-white/50">
                  No matches for &ldquo;{query}&rdquo;.
                </div>
              ) : (
                <>
                  {filteredStates.length > 0 && (
                    <ResultGroup
                      icon={<Building className="h-3.5 w-3.5" />}
                      title={`States (${filteredStates.length})`}
                      tone="text-gold"
                    >
                      {filteredStates.map((st) => (
                        <ResultRow
                          key={st.id}
                          href={`/investors?state=${st.id}`}
                          onClose={onClose}
                          title={st.name}
                          meta={`${st.investmentAmount} pledged`}
                        />
                      ))}
                    </ResultGroup>
                  )}
                  {filteredProjects.length > 0 && (
                    <ResultGroup
                      icon={<Layers className="h-3.5 w-3.5" />}
                      title={`Projects (${filteredProjects.length})`}
                      tone="text-emerald"
                    >
                      {filteredProjects.map((p) => (
                        <ResultRow
                          key={p.id}
                          href="/projects"
                          onClose={onClose}
                          title={p.title}
                          meta={`${p.state} · ${p.budget} · ${p.status}`}
                        />
                      ))}
                    </ResultGroup>
                  )}
                  {filteredTenders.length > 0 && (
                    <ResultGroup
                      icon={<FileText className="h-3.5 w-3.5" />}
                      title={`Tenders (${filteredTenders.length})`}
                      tone="text-amber"
                    >
                      {filteredTenders.map((t) => (
                        <ResultRow
                          key={t.id}
                          href="/tenders"
                          onClose={onClose}
                          title={t.title}
                          meta={`Ref: ${t.tenderNo} · ${t.estimatedCost}`}
                        />
                      ))}
                    </ResultGroup>
                  )}
                  {filteredSchemes.length > 0 && (
                    <ResultGroup
                      icon={<Award className="h-3.5 w-3.5" />}
                      title={`Schemes (${filteredSchemes.length})`}
                      tone="text-gold"
                    >
                      {filteredSchemes.map((s) => (
                        <ResultRow
                          key={s.id}
                          href="/schemes"
                          onClose={onClose}
                          title={s.title}
                          meta={s.benefits}
                        />
                      ))}
                    </ResultGroup>
                  )}
                  {filteredReports.length > 0 && (
                    <ResultGroup
                      icon={<Briefcase className="h-3.5 w-3.5" />}
                      title={`Reports (${filteredReports.length})`}
                      tone="text-brand-blue"
                    >
                      {filteredReports.map((r) => (
                        <ResultRow
                          key={r.id}
                          href="/resources"
                          onClose={onClose}
                          title={r.title}
                          meta={`${r.category} · ${r.fileSize}`}
                        />
                      ))}
                    </ResultGroup>
                  )}
                </>
              )}
            </div>

            <div className="border-t border-white/10 px-5 py-3 flex justify-between text-[11px] text-white/40">
              <span>ESC to close</span>
              <span>EIDF Search Index</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

function ResultGroup({
  icon,
  title,
  tone,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  tone: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4
        className={`text-[11px] font-bold uppercase tracking-[0.14em] mb-3 flex items-center gap-1.5 ${tone}`}
      >
        {icon} {title}
      </h4>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function ResultRow({
  href,
  onClose,
  title,
  meta,
}: {
  href: string;
  onClose: () => void;
  title: string;
  meta: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="flex items-center justify-between border border-white/10 bg-white/[0.03] px-4 py-3.5 hover:bg-white/[0.07] hover:border-gold/30 transition-all"
    >
      <div className="min-w-0 pr-3">
        <div className="text-sm font-semibold text-white truncate">{title}</div>
        <div className="text-[11px] text-white/50 mt-0.5 line-clamp-1">{meta}</div>
      </div>
      <ChevronRight className="h-4 w-4 text-white/30 shrink-0" />
    </Link>
  );
}
