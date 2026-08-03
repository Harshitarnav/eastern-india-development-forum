"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Building2,
  Zap,
  Truck,
  Cpu,
  GraduationCap,
  Sprout,
  Compass,
  FileText,
  Briefcase,
  ShieldCheck,
  Users,
  Award,
  ChevronDown,
  ChevronUp,
  Download,
  Calendar,
  Sparkles,
  MapPin,
  CheckCircle,
  ExternalLink,
  PlusCircle,
} from "lucide-react";
import { site } from "@/content/site";
import { InteractiveMap } from "@/components/InteractiveMap";
import { EcosystemDiagram } from "@/components/EcosystemDiagram";
import { ImpactCounter } from "@/components/ImpactCounter";
import { AiAssistant } from "@/components/AiAssistant";

export default function HomePage() {
  const [openFaqId, setOpenFaqId] = useState<string>("faq-1");
  const [selectedPartnerCategory, setSelectedPartnerCategory] = useState<string>("Govt");

  const focusIcons: Record<string, React.ReactNode> = {
    Truck: <Truck className="h-6 w-6 text-gold" />,
    Zap: <Zap className="h-6 w-6 text-emerald" />,
    Factory: <Building2 className="h-6 w-6 text-blue-400" />,
    Cpu: <Cpu className="h-6 w-6 text-purple-400" />,
    GraduationCap: <GraduationCap className="h-6 w-6 text-amber" />,
    Sprout: <Sprout className="h-6 w-6 text-emerald" />,
    Compass: <Compass className="h-6 w-6 text-pink-400" />,
    Building2: <Building2 className="h-6 w-6 text-gold" />,
  };

  return (
    <div className="relative overflow-hidden bg-cream">
      {/* AI Assistant Floating Widget */}
      <AiAssistant />

      {/* ==================================================== */}
      {/* 1. HERO SECTION */}
      {/* ==================================================== */}
      <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-slate-dark text-white px-4 py-20 md:py-28 lg:py-32 flex items-center">
        {/* Glowing Background Ambient Nodes */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-navy-mid/30 blur-[120px] pointer-events-none" />
        <div className="absolute top-10 right-10 h-72 w-72 rounded-full bg-gold/10 blur-[90px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-emerald/10 blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gold shadow-lg backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" />
                {site.hero.eyebrow}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl text-white">
                Uniting Stakeholders. <br />
                <span className="gradient-text-gold">Unleashing Capital.</span> <br />
                Empowering Communities.
              </h1>

              <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-white/80 md:text-lg">
                {site.hero.subheading}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={site.hero.ctas.primary.href}
                  className="rounded-full bg-gold px-8 py-4 text-sm font-bold text-navy-deep hover:bg-gold-hover transition-transform hover:scale-105 shadow-xl flex items-center gap-2"
                >
                  {site.hero.ctas.primary.label} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={site.hero.ctas.secondary.href}
                  className="rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold text-white hover:bg-white/20 transition-all backdrop-blur-md"
                >
                  {site.hero.ctas.secondary.label}
                </Link>
                <Link
                  href={site.hero.ctas.tertiary.href}
                  className="rounded-full border border-emerald/40 bg-emerald/10 px-7 py-4 text-sm font-semibold text-emerald hover:bg-emerald hover:text-navy-deep transition-all"
                >
                  {site.hero.ctas.tertiary.label}
                </Link>
              </div>

              {/* Animated Floating Statistics */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-xl">
                {site.hero.floatingMetrics.map((fm) => (
                  <div key={fm.label} className="text-left">
                    <div className="font-display text-xl font-bold text-gold">{fm.value}</div>
                    <div className="text-[11px] text-white/60 font-medium">{fm.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Visual Hero Element */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl border border-white/15 bg-white/5 overflow-hidden shadow-2xl">
                <img src="/images/hero-banner.jpg" alt="EIDF Hero Banner" className="w-full h-44 object-cover" />
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-bold text-emerald uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4" /> Single Window Authority
                    </span>
                    <span className="text-[11px] text-white/60">Live Portal Engine</span>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-2xl bg-navy-deep/80 p-4 border border-white/10">
                      <div className="text-xs text-white/50 mb-1">Pledged Infrastructure Capital</div>
                      <div className="font-display text-3xl font-extrabold text-white">
                        ₹25,000 Crores
                      </div>
                      <div className="mt-2 flex items-center text-[11px] text-emerald">
                        <TrendingUp className="h-3.5 w-3.5 mr-1" /> +24% YoY Regional Growth
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-white/5 p-3 border border-white/10">
                        <div className="text-[11px] text-white/60">Active States</div>
                        <div className="text-lg font-bold text-gold">8 States & UTs</div>
                      </div>
                      <div className="rounded-xl bg-white/5 p-3 border border-white/10">
                        <div className="text-[11px] text-white/60">PPP Corridors</div>
                        <div className="text-lg font-bold text-emerald">42 Projects</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-center text-xs text-white/60">
                    Facilitating Bihar, Jharkhand, Odisha, WB, Assam & NE States
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 2. IMPACT DASHBOARD COUNTERS */}
      {/* ==================================================== */}
      <section className="relative z-10 -mt-12 mx-auto max-w-7xl px-4">
        <div className="rounded-3xl border border-gold/20 bg-white/95 backdrop-blur-xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-emerald/5 blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 relative z-10">
            {site.impactStats.map((st, idx) => {
              const valueColor = idx % 3 === 0 
                ? "text-amber-600" 
                : idx % 3 === 1 
                  ? "text-emerald-700" 
                  : "text-navy";
              
              return (
                <div key={st.key} className="text-center space-y-2 group transition-all duration-300 hover:scale-105">
                  <div className="flex justify-center">
                    <div className="h-1.5 w-8 rounded-full bg-navy/5 group-hover:bg-gold transition-colors" />
                  </div>
                  <div className={`font-display text-2xl font-extrabold lg:text-3xl ${valueColor}`}>
                    <ImpactCounter
                      value={st.value}
                      prefix={st.prefix}
                      suffix={st.suffix}
                    />
                  </div>
                  <div className="text-[11px] font-bold text-navy/80 group-hover:text-navy transition-colors tracking-tight leading-tight max-w-[120px] mx-auto">
                    {st.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 3. INTERACTIVE EASTERN INDIA STATE MAP */}
      {/* ==================================================== */}
      <section id="state-map" className="py-20 px-4">
        <div className="mx-auto max-w-7xl text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">
            REGIONAL INTELLIGENCE & GIS PORTAL
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mt-1">
            Explore Development Across Eastern India
          </h2>
          <p className="text-sm text-muted max-w-2xl mx-auto mt-2">
            Click on any state to inspect active corridors, pledged capital, priority sectors, and government initiatives.
          </p>
        </div>
        <InteractiveMap states={site.statesData as any} />
      </section>

      {/* ==================================================== */}
      {/* 4. ABOUT EIDF */}
      {/* ==================================================== */}
      <section className="py-20 bg-cream-warm px-4 border-y border-line">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-dark">
              ABOUT EASTERN INDIA DEVELOPMENT FORUM
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              Empowering Eastern India Through Strategic Alignment & Capital Facilitation
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              EIDF operates under the aegis of Umanand Eastern Foundation . It serves as the apex non-governmental development council bridging state administrations, domestic industry leaders, global investors, and regional communities.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {site.values.map((v) => (
                <div key={v.title} className="rounded-2xl bg-white p-4 border border-line shadow-xs">
                  <h4 className="font-display text-base font-bold text-navy mb-1">{v.title}</h4>
                  <p className="text-xs text-muted leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-gold transition-colors"
              >
                Read Our Full Charter & Journey Timeline →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-line bg-white p-8 shadow-xl space-y-6">
              <h3 className="font-display text-2xl font-bold text-navy">Leadership & Governance</h3>
              <div className="grid grid-cols-2 gap-4">
                {site.leaders.map((leader) => (
                  <div key={leader.name} className="p-4 rounded-2xl bg-cream border border-line">
                    <div className="font-display text-sm font-bold text-navy">{leader.name}</div>
                    <div className="text-xs text-muted mt-1">{leader.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 5. FOCUS AREAS */}
      {/* ==================================================== */}
      <section id="focus-areas" className="py-20 px-4">
        <div className="mx-auto max-w-7xl mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">
            PRIORITY DEVELOPMENT PILLARS
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mt-1">
            Transforming Strategic Sectors Across the Region
          </h2>
        </div>

        <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {site.focusAreas.map((fa) => (
            <div
              key={fa.id}
              className="rounded-3xl border border-line bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-cream border border-line">
                    {focusIcons[fa.iconName] || <Building2 className="h-6 w-6 text-gold" />}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted bg-cream-warm px-2.5 py-1 rounded-full border border-line">
                    {fa.tag}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-navy mb-2">{fa.title}</h3>
                <p className="text-xs text-muted leading-relaxed mb-4">{fa.desc}</p>

                <ul className="space-y-1.5 mb-6">
                  {fa.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-xs font-medium text-navy/80">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald shrink-0" /> {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-line flex items-center justify-between text-xs font-bold">
                <span className="text-emerald">{fa.activeProjects} Active Projects</span>
                <Link href="/projects" className="text-navy hover:text-gold flex items-center gap-1">
                  Details <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================== */}
      {/* 6. DEVELOPMENT ECOSYSTEM DIAGRAM */}
      {/* ==================================================== */}
      <section className="py-12 bg-navy-deep text-white">
        <EcosystemDiagram />
      </section>

      {/* ==================================================== */}
      {/* 7. FEATURED DEVELOPMENT PROJECTS */}
      {/* ==================================================== */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-dark">
              FLAGSHIP CORRIDORS
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mt-1">
              Featured Development Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="rounded-full bg-navy px-6 py-3 text-xs font-bold text-white hover:bg-navy-light transition-colors flex items-center gap-2"
          >
            View All Projects ({site.projects.length}) <ArrowRight className="h-3.5 w-3.5 text-gold" />
          </Link>
        </div>

        <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-2">
          {site.projects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-3xl border border-line bg-white p-6 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden rounded-2xl mb-4 bg-cream border border-line">
                  <img
                    src={`/images/eidf_${proj.id === "proj-1" ? "01" : proj.id === "proj-2" ? "02" : proj.id === "proj-3" ? "03" : "04"}.jpg`}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-bold text-gold-hover border border-gold/30 uppercase tracking-wider">
                    {proj.tag}
                  </span>
                  <span className="rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald-dark border border-emerald/20">
                    {proj.status}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-navy mb-2">{proj.title}</h3>
                <p className="text-xs text-muted leading-relaxed mb-4">{proj.desc}</p>

                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-cream border border-line mb-4 text-xs">
                  <div>
                    <div className="text-muted text-[10px]">State</div>
                    <div className="font-bold text-navy">{proj.state}</div>
                  </div>
                  <div>
                    <div className="text-muted text-[10px]">Budget</div>
                    <div className="font-bold text-gold">{proj.budget}</div>
                  </div>
                  <div>
                    <div className="text-muted text-[10px]">Timeline</div>
                    <div className="font-bold text-navy">{proj.timeline}</div>
                  </div>
                </div>

                <div className="space-y-1 text-xs mb-4">
                  <span className="font-bold text-navy">Partners: </span>
                  <span className="text-muted">{proj.partners.join(" · ")}</span>
                </div>
              </div>

              <Link
                href="/projects"
                className="mt-2 inline-flex items-center justify-center rounded-2xl border border-navy/20 bg-cream py-3 text-xs font-bold text-navy hover:bg-navy hover:text-white transition-colors"
              >
                Inspect Project Blueprint →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================== */}
      {/* 8. GOVERNMENT SCHEMES DIRECTORY */}
      {/* ==================================================== */}
      <section className="py-20 bg-cream-warm px-4 border-y border-line">
        <div className="mx-auto max-w-7xl mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">
            POLICY & INCENTIVE PORTAL
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mt-1">
            Government Schemes & Subsidies
          </h2>
          <p className="text-sm text-muted max-w-xl mx-auto mt-2">
            Access capital subsidies, tax exemptions, and grant mechanisms across all Eastern states.
          </p>
        </div>

        <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-3">
          {site.schemes.map((sch) => (
            <div key={sch.id} className="rounded-3xl border border-line bg-white p-6 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-dark bg-emerald/10 px-2.5 py-1 rounded-full border border-emerald/20">
                  {sch.category}
                </span>
                <h3 className="font-display text-xl font-bold text-navy mt-3 mb-2">{sch.title}</h3>
                <div className="text-xs font-medium text-navy/70 mb-4">{sch.authority}</div>

                <div className="p-3 rounded-2xl bg-gold/10 border border-gold/30 text-xs font-semibold text-navy-deep mb-4">
                  {sch.benefits}
                </div>

                <div className="text-xs space-y-1.5 text-muted mb-4">
                  <div className="font-bold text-navy">Eligibility Highlights:</div>
                  <ul className="list-disc list-inside space-y-1">
                    {sch.eligibility.map((el) => (
                      <li key={el}>{el}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href="/schemes"
                className="inline-flex items-center justify-center rounded-2xl bg-navy py-3 text-xs font-bold text-white hover:bg-navy-light transition-colors"
              >
                Check Eligibility & Apply →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================== */}
      {/* 9. TENDER ASSISTANCE CENTER */}
      {/* ==================================================== */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber">
              PUBLIC PROCUREMENT & RFPs
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mt-1">
              Tender Assistance Center
            </h2>
          </div>
          <Link
            href="/tenders"
            className="rounded-full bg-gold px-6 py-3 text-xs font-bold text-navy-deep hover:bg-gold-hover transition-colors flex items-center gap-2"
          >
            Explore Open Tenders Portal <FileText className="h-4 w-4" />
          </Link>
        </div>

        <div className="mx-auto max-w-7xl">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-hidden rounded-3xl border border-line bg-white shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-navy text-white text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Tender Ref No.</th>
                    <th className="p-4">Project Title</th>
                    <th className="p-4">Issuing Authority</th>
                    <th className="p-4">State</th>
                    <th className="p-4">Est. Value</th>
                    <th className="p-4">Deadline</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line font-medium text-navy/90">
                  {site.tenders.map((tnd) => (
                    <tr key={tnd.id} className="hover:bg-cream transition-colors">
                      <td className="p-4 font-mono font-bold text-gold-label">{tnd.tenderNo}</td>
                      <td className="p-4 font-bold text-navy max-w-xs">{tnd.title}</td>
                      <td className="p-4 text-muted">{tnd.issuingAuthority}</td>
                      <td className="p-4">{tnd.state}</td>
                      <td className="p-4 font-bold text-emerald-dark">{tnd.estimatedCost}</td>
                      <td className="p-4 font-bold text-amber">{tnd.closingDate}</td>
                      <td className="p-4">
                        <Link
                          href="/tenders"
                          className="inline-flex items-center gap-1 text-xs font-bold text-navy hover:text-gold"
                        >
                          Guidance <ArrowRight className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card List View */}
          <div className="md:hidden space-y-4">
            {site.tenders.map((tnd) => (
              <div key={tnd.id} className="rounded-2xl border border-line bg-white p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold text-gold-label bg-gold/10 px-2 py-0.5 rounded border border-gold/30">
                    {tnd.tenderNo}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-dark bg-emerald/10 px-2 py-0.5 rounded border border-emerald/20">
                    {tnd.estimatedCost}
                  </span>
                </div>
                <h4 className="font-display text-sm font-bold text-navy">{tnd.title}</h4>
                <div className="text-[11px] text-muted space-y-1.5 pt-2 border-t border-line/60">
                  <div>Authority: <span className="text-navy font-bold">{tnd.issuingAuthority}</span></div>
                  <div className="flex justify-between items-center">
                    <span>State: <span className="text-navy font-bold">{tnd.state}</span></span>
                    <span>Deadline: <span className="text-amber font-bold">{tnd.closingDate}</span></span>
                  </div>
                </div>
                <Link
                  href="/tenders"
                  className="w-full flex items-center justify-center gap-1 rounded-xl bg-navy py-2.5 text-xs font-bold text-white hover:bg-navy-light transition-colors mt-2"
                >
                  Request Guidance Desk <ArrowRight className="h-3 w-3 text-gold" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 10. INVESTMENT OPPORTUNITIES & PPP */}
      {/* ==================================================== */}
      <section className="py-20 bg-navy-deep text-white px-4">
        <div className="mx-auto max-w-7xl mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">
            CAPITAL ALLOCATION PORTAL
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-1">
            Industrial Parks & PPP Investment Opportunities
          </h2>
        </div>

        <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-2">
          {site.investmentZones.map((zone) => (
            <div
              key={zone.id}
              className="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-md shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald">
                    {zone.state} · {zone.area}
                  </span>
                  <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-gold">
                    Model: {zone.pppModel}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-2">{zone.name}</h3>
                <div className="text-xs text-white/60 mb-4">{zone.location}</div>

                <div className="mb-4">
                  <div className="text-xs font-bold text-gold uppercase tracking-wider mb-2">Focus Industries:</div>
                  <div className="flex flex-wrap gap-2">
                    {zone.focusIndustries.map((ind) => (
                      <span key={ind} className="rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-white/80 mb-6">
                  <div className="font-bold text-emerald">Key Incentives:</div>
                  <ul className="list-disc list-inside space-y-1">
                    {zone.incentives.map((inc) => (
                      <li key={inc}>{inc}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href="/investors"
                className="inline-flex items-center justify-center rounded-2xl bg-gold py-3.5 text-xs font-bold text-navy-deep hover:bg-gold-hover transition-colors"
              >
                Connect With Investment Officer →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================== */}
      {/* 11. STARTUP & INNOVATION HUB */}
      {/* ==================================================== */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-dark">
              ENTREPRENEURIAL ENGINE
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              Eastern India Startup & Innovation Hub
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              We empower early-stage and growth founders with seed incubation capital, industry mentorship, patent filing support, and access to regional venture funds.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-line shadow-xs">
                <div className="font-bold text-navy text-lg mb-1">Seed Incubation</div>
                <div className="text-muted">Grants up to ₹50 Lakhs for Agri-Tech & Clean-Tech.</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-line shadow-xs">
                <div className="font-bold text-navy text-lg mb-1">Mentorship Net</div>
                <div className="text-muted">150+ senior CXO mentors across global tech hubs.</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-3xl border border-line bg-gradient-to-br from-navy to-slate-dark text-white p-8 shadow-2xl">
            <h3 className="font-display text-2xl font-bold text-white mb-2">Apply for Cohort 2026</h3>
            <p className="text-xs text-white/70 mb-6">
              Accelerate your startup with direct access to state procurement desks and angel syndicates.
            </p>
            <Link
              href="/proposals/submit"
              className="inline-flex items-center justify-center w-full rounded-2xl bg-gold py-3.5 text-xs font-bold text-navy-deep hover:bg-gold-hover transition-colors"
            >
              Submit Startup Pitch Deck →
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 12. KNOWLEDGE CENTER & RESEARCH REPORTS */}
      {/* ==================================================== */}
      <section className="py-20 bg-cream-warm px-4 border-y border-line">
        <div className="mx-auto max-w-7xl flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              POLICY BRIEFS & WHITEPAPERS
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mt-1">
              Knowledge Center & Downloads
            </h2>
          </div>
          <Link href="/resources" className="text-xs font-bold text-navy hover:text-gold flex items-center gap-1">
            Browse Full Library <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-2">
          {site.reports.map((rep) => (
            <div key={rep.id} className="rounded-3xl border border-line bg-white p-6 shadow-md flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/30">
                  {rep.category}
                </span>
                <h3 className="font-display text-lg font-bold text-navy mt-2 mb-1">{rep.title}</h3>
                <p className="text-xs text-muted leading-relaxed mb-3">{rep.summary}</p>
                <div className="text-[11px] text-muted font-medium">
                  Author: {rep.author} · Date: {rep.date} · Size: {rep.fileSize}
                </div>
              </div>

              <a
                href={rep.downloadUrl}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-navy text-white hover:bg-gold hover:text-navy-deep transition-colors shadow-md"
              >
                <Download className="h-5 w-5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================== */}
      {/* 13 & 14. NEWS & EVENTS */}
      {/* ==================================================== */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12">
          {/* News Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-display text-2xl font-bold text-navy">News & Media Coverage</h3>
              <span className="text-xs font-bold text-gold">Latest Releases</span>
            </div>

            <div className="space-y-4">
              {site.news.map((nw) => (
                <div key={nw.id} className="p-5 rounded-2xl bg-white border border-line shadow-xs">
                  <div className="text-[11px] text-muted mb-1">{nw.date} · {nw.source}</div>
                  <h4 className="font-display text-base font-bold text-navy mb-2">{nw.title}</h4>
                  <p className="text-xs text-muted leading-relaxed mb-2">{nw.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Events Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-display text-2xl font-bold text-navy">Upcoming Summits & Meets</h3>
              <Link href="/events" className="text-xs font-bold text-navy hover:text-gold">
                View Calendar →
              </Link>
            </div>

            <div className="space-y-4">
              {site.events.map((ev) => (
                <div key={ev.id} className="p-5 rounded-2xl bg-gradient-to-r from-navy to-slate-dark text-white shadow-xl flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/20 px-2.5 py-0.5 rounded-full">
                      {ev.type} · {ev.mode}
                    </span>
                    <h4 className="font-display text-lg font-bold text-white mt-2 mb-1">{ev.title}</h4>
                    <div className="text-xs text-white/70 flex items-center gap-2 mb-2">
                      <Calendar className="h-3.5 w-3.5 text-emerald" /> {ev.date} | {ev.location}
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed">{ev.desc}</p>
                  </div>

                  <Link
                    href={ev.registerUrl}
                    className="rounded-full bg-gold px-4 py-2 text-xs font-bold text-navy-deep hover:bg-gold-hover shrink-0"
                  >
                    Register
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 15. SUCCESS STORIES */}
      {/* ==================================================== */}
      <section className="py-20 bg-cream-warm px-4 border-y border-line">
        <div className="mx-auto max-w-7xl text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-dark">
            TRANSFORMATION IN ACTION
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mt-1">
            Success Stories & Community Impact
          </h2>
        </div>

        <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-2">
          <div className="p-6 rounded-3xl bg-white border border-line shadow-md space-y-3">
            <div className="text-xs font-bold text-gold">Adityapur Net-Zero Park · Jharkhand</div>
            <h4 className="font-display text-xl font-bold text-navy">
              &ldquo;Transitioning 450 industrial units into green energy powerhouse.&rdquo;
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              With EIDF facilitation, the industrial cluster secured rooftop solar installations cutting power costs by 28% while generating 8,500 green jobs.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-line shadow-md space-y-3">
            <div className="text-xs font-bold text-emerald">Cuttack Skill Academy · Odisha</div>
            <h4 className="font-display text-xl font-bold text-navy">
              &ldquo;Empowering 15,000 rural youth with industry 4.0 technical skills.&rdquo;
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              The flagship campus trains students in precision machining, robotics, and hospitality with guaranteed regional placement.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 16. BECOME A PARTNER */}
      {/* ==================================================== */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">
            COLLABORATION CHANNELS
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mt-1">
            Partner With Eastern India Development Forum
          </h2>
        </div>

        <div className="mx-auto max-w-5xl rounded-3xl border border-line bg-white p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {["Govt", "Corporate/CSR", "NGO", "Academic", "Investor"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedPartnerCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${selectedPartnerCategory === cat
                    ? "bg-navy text-gold shadow-md scale-105"
                    : "bg-cream text-muted hover:bg-cream-warm"
                  }`}
              >
                {cat} Partnership
              </button>
            ))}
          </div>

          <div className="text-center max-w-xl mx-auto space-y-4">
            <h3 className="font-display text-2xl font-bold text-navy">
              {selectedPartnerCategory} Engagement Framework
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Collaborate directly with EIDF committees to implement infrastructure projects, CSR capital allocation, policy research, or talent skilling.
            </p>
            <Link
              href="/contact?intent=partner"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-xs font-bold text-navy-deep hover:bg-gold-hover transition-transform hover:scale-105 shadow-lg"
            >
              Initiate Partnership Dialogue →
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 17. MEMBERSHIP NETWORK */}
      {/* ==================================================== */}
      <section className="py-20 bg-navy-deep text-white px-4">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              GLOBAL DIASPORA & CITIZEN NETWORK
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Become an Official EIDF Member
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              Whether you are living in Bihar, Jharkhand, Odisha, West Bengal, Assam, or serving in international global hubs (USA, UK, Gulf, Singapore), your skills and capital can shape Eastern India&apos;s future.
            </p>

            <ul className="space-y-2 text-xs text-white/90">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald" /> Access to confidential project briefs & RFP notifications
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald" /> Invitation to annual Global Diaspora Investment Summits
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald" /> Voting rights on community heritage preservation projects
              </li>
            </ul>

            <Link
              href="/membership"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold text-navy-deep hover:bg-gold-hover transition-transform hover:scale-105 shadow-2xl"
            >
              Register For Membership Card →
            </Link>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            {/* Digital Membership Pass Card Preview */}
            <div className="w-full max-w-sm rounded-3xl border border-white/20 bg-gradient-to-br from-navy via-navy-mid to-slate-dark p-6 shadow-2xl space-y-6 glow-gold relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="font-display text-lg font-bold text-gold">EIDF MEMBER CARD</div>
                <span className="text-[10px] uppercase font-mono text-emerald">OFFICIAL CREATIVE</span>
              </div>
              <div>
                <div className="text-xs text-white/60">Member Name</div>
                <div className="font-display text-xl font-bold text-white">Eastern India Advocate</div>
                <div className="text-xs text-gold mt-1">ID: EIDF-2026-88902</div>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-white/10 text-[11px] text-white/60">
                <span>Valid: 2026 - Lifetime</span>
                <span className="font-bold text-white">Umanand Foundation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 18. INTERACTIVE FAQ ACCORDION */}
      {/* ==================================================== */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              HELP & TRANSPARENCY
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {site.faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-line bg-white shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? "" : faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-navy hover:text-gold transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="h-5 w-5 text-gold shrink-0" /> : <ChevronDown className="h-5 w-5 text-muted shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs leading-relaxed text-muted border-t border-line/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 19. CONTACT & REGIONAL OFFICES */}
      {/* ==================================================== */}
      <section className="py-20 bg-cream-warm px-4 border-t border-line">
        <div className="mx-auto max-w-7xl text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-dark">
            REGIONAL DIRECTORY
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mt-1">
            Contact & Regional Offices
          </h2>
        </div>

        <div className="mx-auto max-w-7xl grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {site.offices.map((off) => (
            <div key={off.city} className="rounded-3xl border border-line bg-white p-5 shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-2 py-0.5 rounded-full border border-gold/30">
                {off.tag}
              </span>
              <h4 className="font-display text-lg font-bold text-navy mt-2">{off.city}</h4>
              <p className="text-xs text-muted leading-relaxed">{off.address}</p>
              <div className="text-[11px] font-semibold text-navy pt-2">{off.email}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================== */}
      {/* 20. BOTTOM CTA BAND */}
      {/* ==================================================== */}
      <section className="py-20 bg-gradient-to-r from-navy-deep via-navy to-slate-dark text-white px-4 text-center">
        <div className="mx-auto max-w-4xl space-y-6">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
            Wherever You Are, You Can Move Eastern India Forward
          </h2>
          <p className="text-sm text-white/80 max-w-2xl mx-auto">
            Join thousands of diaspora leaders, corporate visionaries, government officers, and changemakers accelerating Eastern India&apos;s development ecosystem.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/membership"
              className="rounded-full bg-gold px-8 py-4 text-sm font-bold text-navy-deep hover:bg-gold-hover transition-transform hover:scale-105 shadow-2xl"
            >
              Become a Member Today
            </Link>
            <Link
              href="/proposals/submit"
              className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white hover:bg-white/20 transition-all"
            >
              Submit Development Proposal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
