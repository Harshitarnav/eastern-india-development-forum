"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, Briefcase, Award, Building, ChevronRight, Layers } from "lucide-react";
import { site } from "@/content/site";
import Link from "next/link";

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent if needed
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const qLower = query.toLowerCase().trim();

  // Search indexing
  const filteredProjects = site.projects.filter(
    (p) => p.title.toLowerCase().includes(qLower) || p.state.toLowerCase().includes(qLower) || p.sector.toLowerCase().includes(qLower)
  );

  const filteredTenders = site.tenders.filter(
    (t) => t.title.toLowerCase().includes(qLower) || t.tenderNo.toLowerCase().includes(qLower) || t.state.toLowerCase().includes(qLower)
  );

  const filteredSchemes = site.schemes.filter(
    (s) => s.title.toLowerCase().includes(qLower) || s.category.toLowerCase().includes(qLower)
  );

  const filteredReports = site.reports.filter(
    (r) => r.title.toLowerCase().includes(qLower) || r.category.toLowerCase().includes(qLower)
  );

  const filteredStates = site.statesData.filter(
    (st) => st.name.toLowerCase().includes(qLower) || st.badge.toLowerCase().includes(qLower)
  );

  const hasResults =
    filteredProjects.length > 0 ||
    filteredTenders.length > 0 ||
    filteredSchemes.length > 0 ||
    filteredReports.length > 0 ||
    filteredStates.length > 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-navy-deep text-white shadow-2xl"
        >
          {/* Input Bar */}
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4 bg-navy">
            <Search className="h-5 w-5 text-gold" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tenders, projects, schemes, reports, states..."
              className="flex-1 bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
            />
            <button
              onClick={onClose}
              className="rounded-full bg-white/10 p-1.5 text-white/60 hover:bg-white/20 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Results Container */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
            {!query.trim() ? (
              <div className="p-8 text-center text-xs text-white/50">
                Type keywords to instantly query EIDF Platform Databases (e.g. &ldquo;Skill&rdquo;, &ldquo;Solar&rdquo;, &ldquo;Bihar&rdquo;, &ldquo;Tender&rdquo;)
              </div>
            ) : !hasResults ? (
              <div className="p-8 text-center text-xs text-white/50">
                No matching tenders, schemes or projects found for &ldquo;{query}&rdquo;.
              </div>
            ) : (
              <>
                {/* States */}
                {filteredStates.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-gold mb-2 flex items-center gap-1.5">
                      <Building className="h-3.5 w-3.5 text-gold" /> States ({filteredStates.length})
                    </h4>
                    <div className="grid gap-2 md:grid-cols-2">
                      {filteredStates.map((st) => (
                        <Link
                          key={st.id}
                          href={`/investors?state=${st.id}`}
                          onClick={onClose}
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 hover:border-gold transition-all"
                        >
                          <div>
                            <div className="text-xs font-bold text-white">{st.name}</div>
                            <div className="text-[11px] text-emerald">{st.investmentAmount} Pledged</div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-white/40" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {filteredProjects.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald mb-2 flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-emerald" /> Facilitated Projects ({filteredProjects.length})
                    </h4>
                    <div className="space-y-2">
                      {filteredProjects.map((p) => (
                        <Link
                          key={p.id}
                          href="/projects"
                          onClick={onClose}
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-all"
                        >
                          <div>
                            <div className="text-xs font-bold text-white">{p.title}</div>
                            <div className="text-[11px] text-white/60">
                              {p.state} · {p.budget} · {p.status}
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-white/40" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tenders */}
                {filteredTenders.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber mb-2 flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-amber" /> Open Tenders ({filteredTenders.length})
                    </h4>
                    <div className="space-y-2">
                      {filteredTenders.map((t) => (
                        <Link
                          key={t.id}
                          href="/tenders"
                          onClick={onClose}
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-all"
                        >
                          <div>
                            <div className="text-xs font-bold text-white">{t.title}</div>
                            <div className="text-[11px] text-amber">
                              Ref: {t.tenderNo} · Est. Cost: {t.estimatedCost}
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-white/40" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Schemes */}
                {filteredSchemes.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-gold mb-2 flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-gold" /> Government Schemes ({filteredSchemes.length})
                    </h4>
                    <div className="space-y-2">
                      {filteredSchemes.map((s) => (
                        <Link
                          key={s.id}
                          href="/schemes"
                          onClick={onClose}
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-all"
                        >
                          <div>
                            <div className="text-xs font-bold text-white">{s.title}</div>
                            <div className="text-[11px] text-white/60">{s.benefits}</div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-white/40" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reports */}
                {filteredReports.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-blue-400" /> Research & Reports ({filteredReports.length})
                    </h4>
                    <div className="space-y-2">
                      {filteredReports.map((r) => (
                        <Link
                          key={r.id}
                          href="/resources"
                          onClick={onClose}
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-all"
                        >
                          <div>
                            <div className="text-xs font-bold text-white">{r.title}</div>
                            <div className="text-[11px] text-white/60">{r.category} · {r.fileSize}</div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-white/40" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Shortcut hint footer */}
          <div className="border-t border-white/10 px-5 py-2.5 bg-navy flex justify-between text-[11px] text-white/50">
            <span>Press ESC to exit search</span>
            <span>EIDF Global Search Index</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
