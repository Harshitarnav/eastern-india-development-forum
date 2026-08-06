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
  type LucideIcon,
} from "lucide-react";
import { InteractiveMap } from "@/components/InteractiveMap";
import { ImpactCounter } from "@/components/ImpactCounter";
import { AiAssistant } from "@/components/AiAssistant";
import { SectionHeader } from "@/components/ui";
import { usePublicSite } from "@/lib/cms/public-provider";
import { DEFAULT_HOMEPAGE } from "@/lib/cms/types";
import { cmsMediaUrl, homepagePreview } from "@/lib/cms/home-preview";
import { LeaderAvatar } from "@/components/LeaderAvatar";

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

const serviceIcons: Record<string, LucideIcon> = {
  FileText,
  LayoutDashboard,
  Briefcase,
  Building2,
  BookOpen,
  Users,
  BarChart3,
  ShieldCheck,
};

function sectionVisible(
  sections: Record<string, { is_visible: boolean } | undefined> | undefined,
  key: string
) {
  return sections?.[key]?.is_visible !== false;
}

export default function HomePageClient() {
  const site = usePublicSite();
  const hp = site.homepage || DEFAULT_HOMEPAGE;
  const [openFaqId, setOpenFaqId] = useState<string>("faq-1");
  const show = (key: string) => sectionVisible(site.sections, key);
  const onlineServices = site.onlineServices || [];
  const homeSchemes = homepagePreview(site.schemes, "schemes");
  const homeTenders = homepagePreview(site.tenders, "tenders");
  const homeProjects = homepagePreview(site.projects, "projects");
  const homeInvestments = homepagePreview(
    site.investmentZones,
    "investments"
  );
  const homeNews = homepagePreview(site.news, "news");
  const homeEvents = homepagePreview(site.events, "events");
  const homeReports = homepagePreview(site.reports, "resources");
  const homeValues = homepagePreview(site.values, "values");

  return (
    <div className="bg-cream">
      <AiAssistant />

      {show("hero") && (
        <section className="relative min-h-[78vh] flex items-end overflow-hidden text-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.hero.image || "/images/hero-banner.jpg"}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/85 to-navy/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/55 to-transparent" />

          <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-24 md:pb-20 md:pt-32">
            <div className="max-w-3xl">
              <div className="reveal mb-7 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <span className="relative flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-full bg-white p-1 shadow-xl ring-[3px] ring-gold">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={site.logo || "/images/logo.png"}
                    alt="EIDF"
                    className="h-full w-full rounded-full object-contain"
                  />
                </span>
                <div className="min-w-0">
                  <div className="font-display text-xl sm:text-2xl font-extrabold tracking-tight leading-tight">
                    {site.name}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-gold/90 font-medium break-words">
                    {site.poweredBy} · Reg. {site.regNo}
                  </div>
                </div>
              </div>

              <p className="reveal reveal-delay-1 mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                {site.hero.eyebrow}
              </p>

              <h1 className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.12] tracking-tight">
                {site.hero.headline}
              </h1>

              <p className="reveal reveal-delay-2 mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-white/70">
                {site.hero.subheading}
              </p>

              <div className="reveal reveal-delay-3 mt-7 flex flex-wrap gap-3">
                <Link href={site.hero.ctas.primary.href} className="btn-primary">
                  {site.hero.ctas.primary.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={site.hero.ctas.secondary.href}
                  className="btn-secondary"
                >
                  {site.hero.ctas.secondary.label}
                </Link>
                {site.hero.ctas.tertiary?.label && (
                  <Link
                    href={site.hero.ctas.tertiary.href || "/investors"}
                    className="btn-secondary"
                  >
                    {site.hero.ctas.tertiary.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {show("onlineServices") && (
        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-7xl px-4 py-6 md:py-7">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-label">
                {hp.onlineServices.title}
              </h2>
              <Link
                href={hp.onlineServices.helpHref}
                className="text-xs font-bold text-navy hover:text-gold"
              >
                {hp.onlineServices.helpLabel}
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-px bg-line border border-line">
              {onlineServices.map((s) => {
                const Icon = serviceIcons[s.iconName] || FileText;
                return (
                  <Link
                    key={s.id || s.href}
                    href={s.href}
                    className="group flex flex-col items-center gap-2 bg-white px-3 py-5 text-center transition-colors hover:bg-cream"
                  >
                    <Icon className="h-6 w-6 text-navy group-hover:text-gold transition-colors" />
                    <span className="text-xs font-bold text-navy">{s.label}</span>
                    <span className="text-[10px] text-muted leading-tight hidden sm:block">
                      {s.desc}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {show("impact") && (
        <section className="metric-strip grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          {site.impactStats.map((st, i) => (
            <div key={st.key}>
              <div
                className={`font-display text-xl md:text-2xl font-extrabold ${
                  i % 3 === 0
                    ? "text-navy"
                    : i % 3 === 1
                      ? "text-emerald-dark"
                      : "text-amber"
                }`}
              >
                <ImpactCounter
                  value={st.value}
                  prefix={st.prefix}
                  suffix={st.suffix}
                />
              </div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-muted leading-tight">
                {st.label}
              </div>
            </div>
          ))}
        </section>
      )}

      {show("about") && (
        <section className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeader
                eyebrow={hp.about.eyebrow}
                title={hp.about.title}
                description={hp.about.description}
                align="left"
              />
              <div className="grid sm:grid-cols-2 gap-6 mt-2">
                {homeValues.map((v) => (
                  <div key={v.title} className="border-l-2 border-gold/50 pl-4">
                    <h3 className="font-display text-base font-bold text-navy">
                      {v.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href={hp.about.ctaHref}
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-gold transition-colors"
              >
                {hp.about.ctaLabel} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="lg:col-span-5">
              <div className="border border-line bg-white">
                <div className="border-b border-line bg-navy px-5 py-3.5">
                  <h3 className="font-display text-sm font-bold text-white">
                    {hp.about.leadersTitle}
                  </h3>
                </div>
                <div className="divide-y divide-line">
                  {site.leaders.map((leader) => (
                    <div
                      key={leader.name}
                      className="flex items-center gap-3 px-5 py-4"
                    >
                      <LeaderAvatar
                        name={leader.name}
                        image={
                          "image" in leader
                            ? (leader.image as string | undefined)
                            : undefined
                        }
                      />
                      <div>
                        <div className="text-sm font-bold text-navy">
                          {leader.name}
                        </div>
                        <div className="text-xs text-muted">{leader.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {show("focus") && (
        <section
          id="focus-areas"
          className="border-y border-line bg-cream-warm px-4 py-16 md:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow={hp.focus.eyebrow}
              title={hp.focus.title}
              description={hp.focus.description}
              align="left"
            />
            <div className="grid gap-px bg-line border border-line sm:grid-cols-2 lg:grid-cols-4">
              {site.focusAreas.map((fa) => (
                <div
                  key={fa.id}
                  className="bg-white p-5 hover:bg-cream transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center bg-navy text-gold mb-3">
                    {focusIcons[fa.iconName] || (
                      <Building2 className="h-5 w-5" />
                    )}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gold-label mb-1">
                    {fa.tag}
                  </div>
                  <h3 className="font-display text-base font-bold text-navy leading-snug">
                    {fa.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted leading-relaxed line-clamp-3">
                    {fa.desc}
                  </p>
                  <div className="mt-3 text-[11px] font-bold text-emerald-dark">
                    {fa.activeProjects} active projects
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {show("map") && (
        <section id="state-map" className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow={hp.map.eyebrow}
              title={hp.map.title}
              description={hp.map.description}
              align="left"
            />
            <InteractiveMap states={site.statesData as any} chrome={hp.map} />
          </div>
        </section>
      )}

      {show("schemes") && (
        <section className="border-y border-line bg-cream-warm px-4 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <SectionHeader
                eyebrow={hp.schemes.eyebrow}
                title={hp.schemes.title}
                align="left"
              />
              {hp.schemes.ctaLabel && (
                <Link
                  href={hp.schemes.ctaHref || "/schemes"}
                  className="btn-navy !py-2.5 !px-5 text-xs shrink-0 mb-10"
                >
                  {hp.schemes.ctaLabel}{" "}
                  <ArrowRight className="h-3.5 w-3.5 text-gold" />
                </Link>
              )}
            </div>
            <div className="divide-y divide-line border border-line bg-white">
              {homeSchemes.map((sch) => (
                <div
                  key={sch.id}
                  className="grid gap-4 p-5 md:grid-cols-12 md:items-center md:gap-6"
                >
                  <div className="md:col-span-5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-dark">
                      {sch.category}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-bold text-navy">
                      {sch.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted">{sch.authority}</p>
                  </div>
                  <div className="md:col-span-5 text-sm text-navy/80 leading-relaxed">
                    {sch.benefits}
                  </div>
                  <div className="md:col-span-2 md:text-right">
                    <Link
                      href="/schemes"
                      className="text-xs font-bold text-navy hover:text-gold inline-flex items-center gap-1"
                    >
                      Details <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {show("tenders") && (
        <section className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <SectionHeader
                eyebrow={hp.tenders.eyebrow}
                title={hp.tenders.title}
                align="left"
              />
              {hp.tenders.ctaLabel && (
                <Link
                  href={hp.tenders.ctaHref || "/tenders"}
                  className="btn-primary !py-2.5 !px-5 text-xs shrink-0 mb-10"
                >
                  {hp.tenders.ctaLabel} <FileText className="h-3.5 w-3.5" />
                </Link>
              )}
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
                  {homeTenders.map((tnd) => (
                    <tr key={tnd.id} className="hover:bg-cream/80">
                      <td className="p-3.5 font-mono text-xs font-bold text-gold-label whitespace-nowrap">
                        {tnd.tenderNo}
                      </td>
                      <td className="p-3.5 font-semibold text-navy max-w-xs">
                        {tnd.title}
                      </td>
                      <td className="p-3.5 text-xs text-muted">
                        {tnd.issuingAuthority}
                      </td>
                      <td className="p-3.5 text-xs">{tnd.state}</td>
                      <td className="p-3.5 text-xs font-bold text-emerald-dark whitespace-nowrap">
                        {tnd.estimatedCost}
                      </td>
                      <td className="p-3.5 text-xs font-bold text-amber whitespace-nowrap">
                        {tnd.closingDate}
                      </td>
                      <td className="p-3.5">
                        <Link
                          href="/tenders"
                          className="text-xs font-bold text-navy hover:text-gold"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-line border border-line bg-white">
              {homeTenders.map((tnd) => (
                <div key={tnd.id} className="p-4 space-y-1.5">
                  <div className="font-mono text-[11px] font-bold text-gold-label">
                    {tnd.tenderNo}
                  </div>
                  <h4 className="font-display text-sm font-bold text-navy">
                    {tnd.title}
                  </h4>
                  <div className="flex justify-between text-xs pt-1">
                    <span className="font-bold text-emerald-dark">
                      {tnd.estimatedCost}
                    </span>
                    <span className="font-bold text-amber">{tnd.closingDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {show("projects") && (
        <section className="border-y border-line bg-cream-warm px-4 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <SectionHeader
                eyebrow={hp.projects.eyebrow}
                title={hp.projects.title}
                align="left"
              />
              {hp.projects.ctaLabel && (
                <Link
                  href={hp.projects.ctaHref || "/projects"}
                  className="btn-navy !py-2.5 !px-5 text-xs shrink-0 mb-10"
                >
                  {hp.projects.ctaLabel}{" "}
                  <ArrowRight className="h-3.5 w-3.5 text-gold" />
                </Link>
              )}
            </div>

            <div className="grid gap-5 lg:grid-cols-12">
              {homeProjects[0] && (
                <Link
                  href="/projects"
                  className="group relative lg:col-span-7 min-h-[320px] overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cmsMediaUrl(
                      homeProjects[0].image,
                      "/images/eidf_01.jpg"
                    )}
                    alt={homeProjects[0].title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-gold">
                      {homeProjects[0].tag}
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-bold">
                      {homeProjects[0].title}
                    </h3>
                    <p className="mt-2 text-sm text-white/70 line-clamp-2 max-w-lg">
                      {homeProjects[0].desc}
                    </p>
                  </div>
                </Link>
              )}
              <div className="lg:col-span-5 flex flex-col gap-5">
                {homeProjects.slice(1, 3).map((proj, idx) => (
                  <Link
                    key={proj.id}
                    href="/projects"
                    className="group relative flex-1 min-h-[150px] overflow-hidden"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cmsMediaUrl(
                        proj.image,
                        `/images/eidf_0${idx + 2}.jpg`
                      )}
                      alt={proj.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gold">
                        {proj.tag}
                      </div>
                      <h3 className="mt-1 font-display text-lg font-bold">
                        {proj.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {show("investors") && (
        <section className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <SectionHeader
                eyebrow={hp.investments.eyebrow}
                title={hp.investments.title}
                align="left"
              />
              {hp.investments.ctaLabel && (
                <Link
                  href={hp.investments.ctaHref || "/investors"}
                  className="btn-navy !py-2.5 !px-5 text-xs shrink-0 mb-10"
                >
                  {hp.investments.ctaLabel}{" "}
                  <ArrowRight className="h-3.5 w-3.5 text-gold" />
                </Link>
              )}
            </div>
            <div className="divide-y divide-line border border-line bg-white">
              {homeInvestments.map((zone) => (
                <div
                  key={zone.id}
                  className="grid gap-4 p-5 md:grid-cols-12 md:items-center"
                >
                  <div className="md:col-span-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-dark">
                      {zone.state} · {zone.area}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-bold text-navy">
                      {zone.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-1 text-xs text-muted">
                      <MapPin className="h-3 w-3 text-emerald" /> {zone.location}
                    </div>
                  </div>
                  <div className="md:col-span-5 flex flex-wrap gap-1.5">
                    {zone.focusIndustries.map((ind) => (
                      <span
                        key={ind}
                        className="border border-line bg-cream px-2 py-0.5 text-[11px] font-semibold text-navy"
                      >
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
      )}

      {show("events") && (
        <section className="border-y border-line bg-cream-warm px-4 py-16 md:py-20">
          <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow={hp.news.eyebrow}
                title={hp.news.title}
                align="left"
              />
              <div className="divide-y divide-line border border-line bg-white -mt-2">
                {homeNews.map((nw) => (
                  <article key={nw.id} className="p-5">
                    <div className="text-[11px] text-muted">
                      {nw.date} · {nw.source}
                    </div>
                    <h4 className="mt-1.5 font-display text-base font-bold text-navy">
                      {nw.title}
                    </h4>
                    <p className="mt-1.5 text-xs text-muted leading-relaxed line-clamp-2">
                      {nw.summary}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-end justify-between gap-3 mb-8">
                <SectionHeader
                  eyebrow={hp.events.eyebrow}
                  title={hp.events.title}
                  align="left"
                />
                {hp.events.ctaLabel && (
                  <Link
                    href={hp.events.ctaHref || "/events"}
                    className="text-xs font-bold text-navy hover:text-gold mb-10 shrink-0"
                  >
                    {hp.events.ctaLabel}
                  </Link>
                )}
              </div>
              <div className="divide-y divide-line border border-line bg-white -mt-2">
                {homeEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-5 flex gap-4 items-start justify-between"
                  >
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gold-label">
                        {ev.type} · {ev.mode}
                      </div>
                      <h4 className="mt-1 font-display text-base font-bold text-navy">
                        {ev.title}
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-emerald" />{" "}
                          {ev.date}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-gold" />{" "}
                          {ev.location}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={ev.registerUrl}
                      className="shrink-0 text-xs font-bold text-navy hover:text-gold"
                    >
                      Register
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {show("resources") && (
        <section className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <SectionHeader
                eyebrow={hp.resources.eyebrow}
                title={hp.resources.title}
                align="left"
              />
              {hp.resources.ctaLabel && (
                <Link
                  href={hp.resources.ctaHref || "/resources"}
                  className="text-xs font-bold text-navy hover:text-gold mb-10"
                >
                  {hp.resources.ctaLabel}
                </Link>
              )}
            </div>
            <div className="divide-y divide-line border border-line bg-white">
              {homeReports.map((rep) => (
                <div
                  key={rep.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5"
                >
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gold-label">
                      {rep.category} · {rep.date}
                    </div>
                    <h4 className="mt-1 font-display text-base font-bold text-navy">
                      {rep.title}
                    </h4>
                    <p className="mt-1 text-xs text-muted line-clamp-1">
                      {rep.summary}
                    </p>
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
      )}

      {show("faq") && (
        <section className="border-y border-line bg-cream-warm px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow={hp.faq.eyebrow}
              title={hp.faq.title}
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
      )}

      {show("offices") && (
        <section className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow={hp.offices.eyebrow}
              title={hp.offices.title}
              description={hp.offices.description}
              align="left"
            />
            <div className="grid gap-px bg-line border border-line sm:grid-cols-2 lg:grid-cols-5">
              {site.offices.map((off) => (
                <div key={off.city} className="bg-white p-5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gold-label">
                    {off.tag}
                  </div>
                  <h4 className="mt-2 font-display text-base font-bold text-navy">
                    {off.city}
                  </h4>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    {off.address}
                  </p>
                  <a
                    href={`mailto:${off.email}`}
                    className="mt-3 block text-[11px] font-semibold text-navy hover:text-gold"
                  >
                    {off.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {show("cta") && (
        <section className="relative overflow-hidden px-4 py-16 md:py-20 text-white">
          <div className="absolute inset-0 bg-navy-deep" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald/15 via-transparent to-gold/15" />
          <div className="relative mx-auto max-w-7xl grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <div className="section-eyebrow text-gold">
                {hp.membershipCta.eyebrow}
              </div>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
                {hp.membershipCta.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/65 max-w-xl">
                {hp.membershipCta.description}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-white/80">
                {hp.membershipCta.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald" /> {bullet}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={hp.membershipCta.primary.href}
                  className="btn-primary"
                >
                  {hp.membershipCta.primary.label}{" "}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={hp.membershipCta.secondary.href}
                  className="btn-secondary"
                >
                  {hp.membershipCta.secondary.label}
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-gold mb-4">
                  <IndianRupee className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {hp.membershipCta.metricsTitle}
                  </span>
                </div>
                <div className="space-y-4">
                  {(site.hero.floatingMetrics || []).map((m) => (
                    <div
                      key={m.label}
                      className="flex items-end justify-between border-b border-white/10 pb-3 last:border-0"
                    >
                      <span className="text-xs text-white/55">{m.label}</span>
                      <span className="font-display text-lg font-bold text-white">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
