"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StateDetail } from "@/content/site";
import type { CmsHomepageMapSettings } from "@/lib/cms/types";
import { DEFAULT_HOMEPAGE } from "@/lib/cms/types";
import {
  MapPin,
  Building,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { usePrefersReducedMotion } from "@/components/motion";

interface InteractiveMapProps {
  states: StateDetail[];
  chrome?: Partial<CmsHomepageMapSettings> | null;
}

/** Stylized Eastern India regions (abstract geography for exploration UX) */
const REGION_PATHS: Record<string, string> = {
  bihar: "M118 72 L168 68 L178 98 L170 128 L128 132 L108 110 Z",
  jharkhand: "M128 132 L170 128 L188 158 L168 188 L130 182 L118 152 Z",
  odisha: "M168 188 L188 158 L220 178 L228 230 L190 248 L160 220 Z",
  westbengal: "M178 98 L230 88 L248 130 L228 170 L188 158 L170 128 Z",
  assam: "M248 90 L310 78 L322 118 L298 148 L248 130 Z",
  northeast: "M298 148 L322 118 L350 140 L348 190 L310 200 L288 170 Z",
};

const REGION_LABELS: Record<string, { x: number; y: number }> = {
  bihar: { x: 138, y: 100 },
  jharkhand: { x: 148, y: 158 },
  odisha: { x: 190, y: 210 },
  westbengal: { x: 208, y: 128 },
  assam: { x: 285, y: 110 },
  northeast: { x: 318, y: 165 },
};

function resolvePath(id: string) {
  if (REGION_PATHS[id]) return REGION_PATHS[id];
  const key = Object.keys(REGION_PATHS).find((k) => id.includes(k) || k.includes(id));
  return key ? REGION_PATHS[key] : null;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  states,
  chrome,
}) => {
  const ui = { ...DEFAULT_HOMEPAGE.map, ...(chrome || {}) };
  const reduced = usePrefersReducedMotion();
  const [selectedStateId, setSelectedStateId] = useState<string>(
    states[0]?.id || "bihar"
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const selectedState =
    states.find((s) => s.id === selectedStateId) || states[0];

  const connections = useMemo(() => {
    if (!selectedState) return [];
    const sel = REGION_LABELS[selectedState.id] || REGION_LABELS.bihar;
    return states
      .filter((s) => s.id !== selectedState.id)
      .map((s) => {
        const pt = REGION_LABELS[s.id];
        if (!pt || !sel) return null;
        return { id: s.id, x1: sel.x, y1: sel.y, x2: pt.x, y2: pt.y };
      })
      .filter(Boolean) as { id: string; x1: number; y1: number; x2: number; y2: number }[];
  }, [selectedState, states]);

  if (!selectedState) return null;

  return (
    <div className="py-4 sm:py-6">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
        <div className="lg:col-span-7 min-w-0">
          <div className="relative overflow-hidden border border-white/10 eidf-depth p-4 sm:p-6 shadow-2xl eidf-grain">
            <div className="relative mb-5 flex flex-col gap-3 border-b border-white/10 pb-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold">
                  {ui.portalEyebrow}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                  {ui.portalTitle}
                </h3>
              </div>
              <div className="inline-flex w-fit items-center gap-2 border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] sm:text-xs text-white/80">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald" />
                <span>{ui.hint}</span>
              </div>
            </div>

            {/* Desktop SVG map */}
            <div className="relative hidden sm:block w-full aspect-[16/11]">
              <svg
                viewBox="80 50 300 220"
                className="h-full w-full"
                role="img"
                aria-label="Eastern India interactive map"
              >
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {!reduced &&
                  connections.map((c) => (
                    <motion.line
                      key={c.id}
                      x1={c.x1}
                      y1={c.y1}
                      x2={c.x2}
                      y2={c.y2}
                      stroke="rgba(232,163,23,0.25)"
                      strokeWidth="1"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                  ))}

                {states.map((st) => {
                  const d = resolvePath(st.id);
                  if (!d) return null;
                  const active = st.id === selectedStateId;
                  const hovered = st.id === hoveredId;
                  return (
                    <g key={st.id}>
                      <motion.path
                        d={d}
                        fill={
                          active
                            ? "rgba(232,163,23,0.35)"
                            : hovered
                              ? "rgba(13,159,110,0.28)"
                              : "rgba(255,255,255,0.08)"
                        }
                        stroke={active ? "#e8a317" : "rgba(255,255,255,0.25)"}
                        strokeWidth={active ? 2 : 1}
                        filter={active ? "url(#glow)" : undefined}
                        className="cursor-pointer transition-colors"
                        onClick={() => setSelectedStateId(st.id)}
                        onMouseEnter={() => setHoveredId(st.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        whileHover={undefined}
                        style={undefined}
                        tabIndex={0}
                        role="button"
                        aria-label={`Select ${st.name}`}
                        aria-pressed={active}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedStateId(st.id);
                          }
                        }}
                      />
                      {REGION_LABELS[st.id] && (
                        <text
                          x={REGION_LABELS[st.id].x}
                          y={REGION_LABELS[st.id].y}
                          textAnchor="middle"
                          className="pointer-events-none fill-white/70 text-[9px] font-semibold uppercase"
                          style={{ fontSize: 9 }}
                        >
                          {(st.name || st.badge || st.id).length > 12
                            ? (st.badge || st.name || st.id).slice(0, 8)
                            : st.name}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Mobile / fallback chips */}
            <div className="sm:hidden flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {states.map((st) => {
                const active = st.id === selectedStateId;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedStateId(st.id)}
                    className={`shrink-0 border px-3.5 py-2.5 text-left transition-colors ${
                      active
                        ? "border-gold bg-gold/15 text-white"
                        : "border-white/10 bg-white/5 text-white/75"
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gold">
                      {st.badge}
                    </div>
                    <div className="font-display text-sm font-bold">{st.name}</div>
                  </button>
                );
              })}
            </div>

            {/* Desktop state list under map */}
            <div className="relative mt-4 hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-2">
              {states.map((st) => {
                const active = st.id === selectedStateId;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedStateId(st.id)}
                    onMouseEnter={() => setHoveredId(st.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`text-left border px-3 py-2.5 transition-colors ${
                      active
                        ? "border-gold bg-gold/10 text-white"
                        : "border-white/10 bg-white/5 text-white/75 hover:bg-white/8"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-sm font-bold truncate">{st.name}</span>
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald shrink-0" />
                      )}
                    </div>
                    <div className="mt-1 flex justify-between text-[10px]">
                      <span className="text-emerald">{st.projectsCount} projects</span>
                      <span className="text-gold">{st.investmentAmount}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="relative mt-5 flex flex-col gap-1.5 text-[11px] sm:text-xs text-white/50 border-t border-white/10 pt-4 sm:flex-row sm:justify-between">
              <span>{ui.coverageNote}</span>
              <span className="shrink-0">{ui.dataUpdatedLabel}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedState.id}
              initial={reduced ? false : { opacity: 0, x: 24, clipPath: "inset(0 0 0 100%)" }}
              animate={{ opacity: 1, x: 0, clipPath: "inset(0 0 0 0%)" }}
              exit={reduced ? undefined : { opacity: 0, x: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="border border-line bg-white p-5 sm:p-6 shadow-xl"
              aria-live="polite"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <span className="bg-emerald/10 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-dark">
                  {selectedState.badge || selectedState.name}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-muted">
                  {ui.intelligenceCardLabel}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-2">
                {selectedState.name}
              </h3>
              <p className="text-sm leading-relaxed text-muted mb-5 sm:mb-6">
                {selectedState.description}
              </p>

              <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div className="bg-cream-warm p-3.5 sm:p-4 border border-line">
                  <div className="flex items-center gap-2 text-xs text-muted mb-1">
                    <TrendingUp className="h-4 w-4 shrink-0 text-emerald" /> {ui.capitalLabel}
                  </div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-navy break-words">
                    {selectedState.investmentAmount}
                  </div>
                </div>
                <div className="bg-cream-warm p-3.5 sm:p-4 border border-line">
                  <div className="flex items-center gap-2 text-xs text-muted mb-1">
                    <Building className="h-4 w-4 shrink-0 text-gold" /> {ui.projectsLabel}
                  </div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-navy">
                    {selectedState.projectsCount} Corridors
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-2.5 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-gold" /> {ui.sectorsLabel}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedState.keySectors || []).map((sector) => (
                    <span
                      key={sector}
                      className="bg-navy/5 px-2.5 py-1 text-xs font-medium text-navy border border-navy/10"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-5 sm:mb-6 bg-navy-deep p-4 text-white">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold mb-2">
                  <ShieldCheck className="h-4 w-4 text-gold" /> {ui.spotlightLabel}
                </div>
                <p className="text-xs leading-relaxed text-white/90 font-medium">
                  &ldquo;{selectedState.successStory}&rdquo;
                </p>
              </div>

              <div className="flex flex-col gap-2.5 min-[400px]:flex-row min-[400px]:gap-3">
                <Link
                  href={`/investors?state=${selectedState.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-navy px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-navy-light"
                  data-cursor="EXPLORE"
                >
                  {ui.exploreCtaLabel} <ArrowRight className="h-3.5 w-3.5 text-gold" />
                </Link>
                <Link
                  href={`/schemes?state=${selectedState.id}`}
                  className="inline-flex items-center justify-center border border-navy/20 bg-cream px-4 py-3 text-xs font-bold text-navy hover:bg-white"
                >
                  {ui.schemesCtaLabel}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
