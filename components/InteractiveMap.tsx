"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StateDetail } from "@/content/site";
import { MapPin, Building, ArrowRight, ShieldCheck, TrendingUp, Layers } from "lucide-react";
import Link from "next/link";

interface InteractiveMapProps {
  states: StateDetail[];
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ states }) => {
  const [selectedStateId, setSelectedStateId] = useState<string>("bihar");

  const selectedState = states.find((s) => s.id === selectedStateId) || states[0];

  return (
    <div className="mx-auto max-w-7xl py-4 sm:py-8">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
        {/* Interactive Map Visualizer */}
        <div className="lg:col-span-7 min-w-0">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-navy-deep via-navy to-slate-dark p-4 sm:p-6 shadow-2xl">
            <div className="absolute top-0 right-0 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-emerald/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

            <div className="relative mb-5 flex flex-col gap-3 border-b border-white/10 pb-4 sm:mb-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold">
                  Interactive GIS Portal
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                  Eastern India Regional Map
                </h3>
              </div>
              <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] sm:text-xs text-white/80">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald" />
                <span>Tap a state for intelligence</span>
              </div>
            </div>

            <div className="relative w-full">
              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3 w-full">
                {states.map((st) => {
                  const isSelected = st.id === selectedStateId;
                  return (
                    <motion.button
                      key={st.id}
                      type="button"
                      onClick={() => setSelectedStateId(st.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative min-w-0 text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 ${
                        isSelected
                          ? "border-gold bg-gradient-to-br from-navy-light/90 to-navy/90 text-white shadow-xl glow-gold"
                          : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="min-w-0 text-[10px] sm:text-[11px] font-bold tracking-wide uppercase text-gold leading-snug break-words">
                          {st.badge}
                        </span>
                        {isSelected && (
                          <motion.span
                            layoutId="active-dot"
                            className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald shadow-[0_0_8px_#10b981]"
                          />
                        )}
                      </div>
                      <h4 className="font-display text-lg sm:text-xl font-bold text-white mb-0.5 truncate">
                        {st.name}
                      </h4>
                      <p className="text-xs text-white/60 mb-3 truncate">{st.capital}</p>

                      <div className="flex flex-col gap-1.5 text-xs pt-2 border-t border-white/10 min-[360px]:flex-row min-[360px]:items-center min-[360px]:justify-between min-[360px]:gap-2">
                        <span className="text-emerald font-semibold whitespace-nowrap">
                          {st.projectsCount} Projects
                        </span>
                        <span className="text-gold font-semibold whitespace-nowrap">
                          {st.investmentAmount}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="relative mt-5 sm:mt-6 flex flex-col gap-1.5 text-[11px] sm:text-xs text-white/50 border-t border-white/10 pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2">
              <span className="leading-relaxed">
                Coverage: Bihar, Jharkhand, Odisha, West Bengal, Assam & NE States
              </span>
              <span className="shrink-0">Data Updated: Live Stream</span>
            </div>
          </div>
        </div>

        {/* Selected State Details Panel */}
        <div className="lg:col-span-5 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedState.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl sm:rounded-3xl border border-line bg-white p-4 sm:p-6 shadow-xl"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full bg-emerald/10 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-dark max-w-full text-left leading-snug">
                  {selectedState.badge}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-muted shrink-0">
                  State Intelligence Card
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-2">
                {selectedState.name}
              </h3>
              <p className="text-sm leading-relaxed text-muted mb-5 sm:mb-6">
                {selectedState.description}
              </p>

              <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div className="rounded-2xl bg-cream-warm p-3.5 sm:p-4 border border-line min-w-0">
                  <div className="flex items-center gap-2 text-xs text-muted mb-1">
                    <TrendingUp className="h-4 w-4 shrink-0 text-emerald" /> Capital Pledged
                  </div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-navy break-words">
                    {selectedState.investmentAmount}
                  </div>
                </div>
                <div className="rounded-2xl bg-cream-warm p-3.5 sm:p-4 border border-line min-w-0">
                  <div className="flex items-center gap-2 text-xs text-muted mb-1">
                    <Building className="h-4 w-4 shrink-0 text-gold" /> Facilitated Projects
                  </div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-navy">
                    {selectedState.projectsCount} Corridors
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-2.5 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-gold" /> Priority Sectors
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedState.keySectors.map((sector) => (
                    <span
                      key={sector}
                      className="rounded-lg bg-navy/5 px-2.5 py-1 text-xs font-medium text-navy border border-navy/10"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-5 sm:mb-6 rounded-2xl bg-navy-deep p-4 text-white">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold mb-2">
                  <ShieldCheck className="h-4 w-4 text-gold" /> Impact Spotlight
                </div>
                <p className="text-xs leading-relaxed text-white/90 font-medium">
                  &ldquo;{selectedState.successStory}&rdquo;
                </p>
              </div>

              <div className="flex flex-col gap-2.5 min-[400px]:flex-row min-[400px]:gap-3">
                <Link
                  href={`/investors?state=${selectedState.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-navy-light shadow-md"
                >
                  Explore Opportunities <ArrowRight className="h-3.5 w-3.5 text-gold" />
                </Link>
                <Link
                  href={`/schemes?state=${selectedState.id}`}
                  className="inline-flex items-center justify-center rounded-full border border-navy/20 bg-cream px-4 py-3 text-xs font-bold text-navy hover:bg-white"
                >
                  View Schemes
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
