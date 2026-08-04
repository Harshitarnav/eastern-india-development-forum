"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Zap,
  Truck,
  Cpu,
  GraduationCap,
  Sprout,
  Compass,
  FileText,
  Briefcase,
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Users,
  Calendar,
  Download,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  MapPin,
  ShieldCheck,
  IndianRupee,
} from "lucide-react";
import { site } from "@/content/site";
import { InteractiveMap } from "@/components/InteractiveMap";
import { ImpactCounter } from "@/components/ImpactCounter";
import { AiAssistant } from "@/components/AiAssistant";
import { SectionHeader } from "@/components/ui";

const focusIcons: Record<string, React.ReactNode> = {
  Truck: <Truck className="h-5 w-5" />,
  Zap: <Zap className="h-5 w-5" />,
  Factory: <Building2 className="h-5 w-5" />,
  Cpu: <Cpu className="h-5 w-5" />,
  GraduationCap: <GraduationCap className="h-5 w-5" />,
  Sprout: <Sprout className="h-5 w-5" />,
  Compass: <Compass className="h-5 w-5" />,
  Building2: <Building2 className="h-5 w-5" />,
};

const quickServices = [
  { href: "/tenders", label: "Tenders", desc: "RFP & procurement", icon: FileText },
  { href: "/schemes", label: "Schemes", desc: "Subsidies & incentives", icon: LayoutDashboard },
  { href: "/investors", label: "Investors", desc: "PPP & industrial parks", icon: Briefcase },
  { href: "/projects", label: "Projects", desc: "Active corridors", icon: Building2 },
  { href: "/resources", label: "Resources", desc: "Reports & policies", icon: BookOpen },
  { href: "/membership", label: "Membership", desc: "Join the network", icon: Users },
  { href: "/analytics", label: "Analytics", desc: "Regional dashboards", icon: BarChart3 },
  { href: "/contact", label: "Help Desk", desc: "Get assistance", icon: ShieldCheck },
];

export default function HomePage() {
  const [openFaqId, setOpenFaqId] = useState<string>("faq-1");

  return (
    <div className="bg-cream">
      <AiAssistant />

      {/* 1. HERO — institutional full-bleed */}
      <section className="relative min-h-[78vh] flex items-end overflow-hidden text-white">
        <img
          src="/images/hero-banner.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/85 to-navy/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/55 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-24 md:pb-20 md:pt-32">
          <div className="max-w-3xl">
            <div className="reveal mb-7 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className="relative flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-full bg-white p-1 shadow-xl ring-[3px] ring-gold">
                <img
                  src="/images/logo.png"
                  alt="EIDF"
                  className="h-full w-full rounded-full object-contain"
                />
              </span>
              <div className="min-w-0">
                <div className="font-display text-xl sm:text-2xl font-extrabold tracking-tight leading-tight">
                  Eastern India Development Forum
                </div>
                <div className="mt-1 text-xs sm:text-sm text-gold/90 font-medium break-words">
                  {site.poweredBy} · Reg. {site.regNo}
                </div>
              </div>
            </div>

            <h1 className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.12] tracking-tight">
              Official development platform for Eastern India
            </h1>

            <p className="reveal reveal-delay-2 mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-white/70">
              {site.hero.subheading}
            </p>

            <div className="reveal reveal-delay-3 mt-7 flex flex-wrap gap-3">
              <Link href={site.hero.ctas.primary.href} className="btn-primary">
                {site.hero.ctas.primary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={site.hero.ctas.secondary.href} className="btn-secondary">
                {site.hero.ctas.secondary.label}
              </Link>
              <Link href="/investors" className="btn-secondary">
                Explore Opportunities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK SERVICES — gov portal style */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-7">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-label">
              Online Services
            </h2>
            <Link href="/contact" className="text-xs font-bold text-navy hover:text-gold">
              Help Desk →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-px bg-line border border-line">
            {quickServices.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group flex flex-col items-center gap-2 bg-white px-3 py-5 text-center transition-colors hover:bg-cream"
              >
                <s.icon className="h-6 w-6 text-navy group-hover:text-gold transition-colors" />
                <span className="text-xs font-bold text-navy">{s.label}</span>
                <span className="text-[10px] text-muted leading-tight hidden sm:block">{s.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. IMPACT METRICS */}
      <section className="metric-strip grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
        {site.impactStats.map((st, i) => (
          <div key={st.key}>
            <div
              className={`font-display text-xl md:text-2xl font-extrabold ${
                i % 3 === 0 ? "text-navy" : i % 3 === 1 ? "text-emerald-dark" : "text-amber"
              }`}
            >
              <ImpactCounter value={st.value} prefix={st.prefix} suffix={st.suffix} />
            </div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-muted leading-tight">
              {st.label}
            </div>
          </div>
        ))}
      </section>

      {/* 4. ABOUT + LEADERSHIP */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="About the Forum"
              title="Apex development council for Eastern India"
              description="EIDF operates under Umanand Eastern Foundation as a non-governmental development council bridging state administrations, industry, global investors, and communities across Bihar, Jharkhand, Odisha, West Bengal, Assam, and the North East."
              align="left"
            />
            <div className="grid sm:grid-cols-2 gap-6 mt-2">
              {site.values.slice(0, 4).map((v) => (
                <div key={v.title} className="border-l-2 border-gold/50 pl-4">
                  <h3 className="font-display text-base font-bold text-navy">{v.title}</h3>
                  <p className="mt-1 text-xs text-muted leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-gold transition-colors"
            >
              Read full charter & leadership <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-5">
            <div className="border border-line bg-white">
              <div className="border-b border-line bg-navy px-5 py-3.5">
                <h3 className="font-display text-sm font-bold text-white">Leadership & Governance</h3>
              </div>
              <div className="divide-y divide-line">
                {site.leaders.map((leader) => (
                  <div key={leader.name} className="flex items-center gap-3 px-5 py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-gold">
                      {leader.name.split(" ").pop()?.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-navy">{leader.name}</div>
                      <div className="text-xs text-muted">{leader.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOCUS AREAS */}
      <section id="focus-areas" className="border-y border-line bg-cream-warm px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Priority Sectors"
            title="Strategic development pillars"
            description="Focus areas aligned with state industrial policies and national development priorities."
            align="left"
          />
          <div className="grid gap-px bg-line border border-line sm:grid-cols-2 lg:grid-cols-4">
            {site.focusAreas.map((fa) => (
              <div key={fa.id} className="bg-white p-5 hover:bg-cream transition-colors">
                <div className="flex h-10 w-10 items-center justify-center bg-navy text-gold mb-3">
                  {focusIcons[fa.iconName] || <Building2 className="h-5 w-5" />}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-gold-label mb-1">
                  {fa.tag}
                </div>
                <h3 className="font-display text-base font-bold text-navy leading-snug">{fa.title}</h3>
                <p className="mt-2 text-xs text-muted leading-relaxed line-clamp-3">{fa.desc}</p>
                <div className="mt-3 text-[11px] font-bold text-emerald-dark">
                  {fa.activeProjects} active projects
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. STATE MAP */}
      <section id="state-map" className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Regional Coverage"
            title="Explore development across Eastern India"
            description="Select a state to view corridors, pledged capital, and priority sectors."
            align="left"
          />
          <InteractiveMap states={site.statesData as any} />
        </div>
      </section>

      {/* 7. SCHEMES */}
      <section className="border-y border-line bg-cream-warm px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <SectionHeader
              eyebrow="Government Schemes"
              title="Subsidies & incentive programmes"
              align="left"
            />
            <Link href="/schemes" className="btn-navy !py-2.5 !px-5 text-xs shrink-0 mb-10">
              All schemes <ArrowRight className="h-3.5 w-3.5 text-gold" />
            </Link>
          </div>
          <div className="divide-y divide-line border border-line bg-white">
            {site.schemes.map((sch) => (
              <div key={sch.id} className="grid gap-4 p-5 md:grid-cols-12 md:items-center md:gap-6">
                <div className="md:col-span-5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-dark">
                    {sch.category}
                  </div>
                  <h3 className="mt-1 font-display text-lg font-bold text-navy">{sch.title}</h3>
                  <p className="mt-1 text-xs text-muted">{sch.authority}</p>
                </div>
                <div className="md:col-span-5 text-sm text-navy/80 leading-relaxed">
                  {sch.benefits}
                </div>
                <div className="md:col-span-2 md:text-right">
                  <Link href="/schemes" className="text-xs font-bold text-navy hover:text-gold inline-flex items-center gap-1">
                    Details <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TENDERS TABLE */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <SectionHeader
              eyebrow="Public Procurement"
              title="Latest tenders & RFPs"
              align="left"
            />
            <Link href="/tenders" className="btn-primary !py-2.5 !px-5 text-xs shrink-0 mb-10">
              Tender portal <FileText className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="hidden md:block overflow-x-auto border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy text-white text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 font-semibold">Ref No.</th>
                  <th className="p-3.5 font-semibold">Title</th>
                  <th className="p-3.5 font-semibold">Authority</th>
                  <th className="p-3.5 font-semibold">State</th>
                  <th className="p-3.5 font-semibold">Value</th>
                  <th className="p-3.5 font-semibold">Closes</th>
                  <th className="p-3.5 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-white">
                {site.tenders.map((tnd) => (
                  <tr key={tnd.id} className="hover:bg-cream/80">
                    <td className="p-3.5 font-mono text-xs font-bold text-gold-label whitespace-nowrap">
                      {tnd.tenderNo}
                    </td>
                    <td className="p-3.5 font-semibold text-navy max-w-xs">{tnd.title}</td>
                    <td className="p-3.5 text-xs text-muted">{tnd.issuingAuthority}</td>
                    <td className="p-3.5 text-xs">{tnd.state}</td>
                    <td className="p-3.5 text-xs font-bold text-emerald-dark whitespace-nowrap">
                      {tnd.estimatedCost}
                    </td>
                    <td className="p-3.5 text-xs font-bold text-amber whitespace-nowrap">
                      {tnd.closingDate}
                    </td>
                    <td className="p-3.5">
                      <Link href="/tenders" className="text-xs font-bold text-navy hover:text-gold">
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden divide-y divide-line border border-line bg-white">
            {site.tenders.map((tnd) => (
              <div key={tnd.id} className="p-4 space-y-1.5">
                <div className="font-mono text-[11px] font-bold text-gold-label">{tnd.tenderNo}</div>
                <h4 className="font-display text-sm font-bold text-navy">{tnd.title}</h4>
                <div className="flex justify-between text-xs pt-1">
                  <span className="font-bold text-emerald-dark">{tnd.estimatedCost}</span>
                  <span className="font-bold text-amber">{tnd.closingDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FEATURED PROJECTS */}
      <section className="border-y border-line bg-cream-warm px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <SectionHeader
              eyebrow="Flagship Projects"
              title="Development corridors in progress"
              align="left"
            />
            <Link href="/projects" className="btn-navy !py-2.5 !px-5 text-xs shrink-0 mb-10">
              All projects <ArrowRight className="h-3.5 w-3.5 text-gold" />
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-12">
            {site.projects[0] && (
              <Link href="/projects" className="group relative lg:col-span-7 min-h-[320px] overflow-hidden">
                <img
                  src="/images/eidf_01.jpg"
                  alt={site.projects[0].title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-gold">
                    {site.projects[0].tag}
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold">{site.projects[0].title}</h3>
                  <p className="mt-2 text-sm text-white/70 line-clamp-2 max-w-lg">{site.projects[0].desc}</p>
                </div>
              </Link>
            )}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {site.projects.slice(1, 3).map((proj, idx) => (
                <Link key={proj.id} href="/projects" className="group relative flex-1 min-h-[150px] overflow-hidden">
                  <img
                    src={`/images/eidf_0${idx + 2}.jpg`}
                    alt={proj.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gold">{proj.tag}</div>
                    <h3 className="mt-1 font-display text-lg font-bold">{proj.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. INVESTMENT ZONES */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <SectionHeader
              eyebrow="Investment Desk"
              title="Industrial parks & PPP opportunities"
              align="left"
            />
            <Link href="/investors" className="btn-navy !py-2.5 !px-5 text-xs shrink-0 mb-10">
              Investor portal <ArrowRight className="h-3.5 w-3.5 text-gold" />
            </Link>
          </div>
          <div className="divide-y divide-line border border-line bg-white">
            {site.investmentZones.map((zone) => (
              <div key={zone.id} className="grid gap-4 p-5 md:grid-cols-12 md:items-center">
                <div className="md:col-span-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-dark">
                    {zone.state} · {zone.area}
                  </div>
                  <h3 className="mt-1 font-display text-lg font-bold text-navy">{zone.name}</h3>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted">
                    <MapPin className="h-3 w-3 text-emerald" /> {zone.location}
                  </div>
                </div>
                <div className="md:col-span-5 flex flex-wrap gap-1.5">
                  {zone.focusIndustries.map((ind) => (
                    <span key={ind} className="border border-line bg-cream px-2 py-0.5 text-[11px] font-semibold text-navy">
                      {ind}
                    </span>
                  ))}
                </div>
                <div className="md:col-span-3 md:text-right">
                  <Link
                    href="/investors"
                    className="inline-flex items-center gap-1 text-xs font-bold text-navy hover:text-gold"
                  >
                    View zone <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. NEWS + EVENTS */}
      <section className="border-y border-line bg-cream-warm px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Press & Media" title="Latest announcements" align="left" />
            <div className="divide-y divide-line border border-line bg-white -mt-2">
              {site.news.map((nw) => (
                <article key={nw.id} className="p-5">
                  <div className="text-[11px] text-muted">{nw.date} · {nw.source}</div>
                  <h4 className="mt-1.5 font-display text-base font-bold text-navy">{nw.title}</h4>
                  <p className="mt-1.5 text-xs text-muted leading-relaxed line-clamp-2">{nw.summary}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-end justify-between gap-3 mb-8">
              <SectionHeader eyebrow="Calendar" title="Upcoming events" align="left" />
              <Link href="/events" className="text-xs font-bold text-navy hover:text-gold mb-10 shrink-0">
                Full calendar →
              </Link>
            </div>
            <div className="divide-y divide-line border border-line bg-white -mt-2">
              {site.events.map((ev) => (
                <div key={ev.id} className="p-5 flex gap-4 items-start justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gold-label">
                      {ev.type} · {ev.mode}
                    </div>
                    <h4 className="mt-1 font-display text-base font-bold text-navy">{ev.title}</h4>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-emerald" /> {ev.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-gold" /> {ev.location}
                      </span>
                    </div>
                  </div>
                  <Link href={ev.registerUrl} className="shrink-0 text-xs font-bold text-navy hover:text-gold">
                    Register
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12. RESOURCES */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <SectionHeader
              eyebrow="Knowledge Center"
              title="Reports & policy downloads"
              align="left"
            />
            <Link href="/resources" className="text-xs font-bold text-navy hover:text-gold mb-10">
              Full library →
            </Link>
          </div>
          <div className="divide-y divide-line border border-line bg-white">
            {site.reports.map((rep) => (
              <div key={rep.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gold-label">
                    {rep.category} · {rep.date}
                  </div>
                  <h4 className="mt-1 font-display text-base font-bold text-navy">{rep.title}</h4>
                  <p className="mt-1 text-xs text-muted line-clamp-1">{rep.summary}</p>
                </div>
                <a
                  href={rep.downloadUrl}
                  className="inline-flex shrink-0 items-center gap-2 border border-navy bg-navy px-4 py-2.5 text-xs font-bold text-white hover:bg-navy-light"
                >
                  <Download className="h-3.5 w-3.5 text-gold" /> PDF
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="border-y border-line bg-cream-warm px-4 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            eyebrow="Help & Transparency"
            title="Frequently asked questions"
            align="left"
          />
          <div className="divide-y divide-line border border-line bg-white">
            {site.faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id}>
                  <button
                    onClick={() => setOpenFaqId(isOpen ? "" : faq.id)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left text-sm font-bold text-navy hover:text-gold transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-gold shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm leading-relaxed text-muted border-t border-line/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 14. OFFICES */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Directory"
            title="Regional offices"
            description="State cells ready to assist with membership, investment, and project facilitation."
            align="left"
          />
          <div className="grid gap-px bg-line border border-line sm:grid-cols-2 lg:grid-cols-5">
            {site.offices.map((off) => (
              <div key={off.city} className="bg-white p-5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gold-label">
                  {off.tag}
                </div>
                <h4 className="mt-2 font-display text-base font-bold text-navy">{off.city}</h4>
                <p className="mt-2 text-xs text-muted leading-relaxed">{off.address}</p>
                <a href={`mailto:${off.email}`} className="mt-3 block text-[11px] font-semibold text-navy hover:text-gold">
                  {off.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. MEMBERSHIP + BOTTOM CTA */}
      <section className="relative overflow-hidden px-4 py-16 md:py-20 text-white">
        <div className="absolute inset-0 bg-navy-deep" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald/15 via-transparent to-gold/15" />
        <div className="relative mx-auto max-w-7xl grid gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <div className="section-eyebrow text-gold">Citizen & Diaspora Network</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
              Become an official EIDF member
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/65 max-w-xl">
              Access project briefs, RFP notifications, diaspora summits, and a voice in community heritage initiatives.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald" /> Confidential project & RFP updates
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald" /> Global diaspora investment summit invitations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald" /> Voting rights on heritage programmes
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/membership" className="btn-primary">
                Register for membership <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/proposals/submit" className="btn-secondary">
                Submit a proposal
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-gold mb-4">
                <IndianRupee className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Facilitation Snapshot</span>
              </div>
              <div className="space-y-4">
                {site.hero.floatingMetrics.map((m) => (
                  <div key={m.label} className="flex items-end justify-between border-b border-white/10 pb-3 last:border-0">
                    <span className="text-xs text-white/55">{m.label}</span>
                    <span className="font-display text-lg font-bold text-white">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
