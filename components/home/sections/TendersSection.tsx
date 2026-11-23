"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { ClipReveal } from "@/components/motion";
import { SectionHeader } from "@/components/ui";
import type { TenderItem } from "@/content/site";
import type { CmsHomepageSectionCopy } from "@/lib/cms/types";

type TendersSectionProps = {
  tenders: TenderItem[];
  chrome: CmsHomepageSectionCopy;
};

function statusDot(status: TenderItem["status"]) {
  if (status === "Open") return "bg-emerald";
  if (status === "Closing Soon") return "bg-amber";
  return "bg-gold";
}

export function TendersSection({ tenders, chrome }: TendersSectionProps) {
  const portalHref = chrome.ctaHref || "/tenders";

  return (
    <section id="tenders" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <ClipReveal direction="up">
            <SectionHeader
              eyebrow={chrome.eyebrow}
              title={chrome.title}
              align="left"
              className="!mb-0"
            />
          </ClipReveal>
          {chrome.ctaLabel && (
            <ClipReveal direction="right" className="shrink-0">
              <Link
                href={portalHref}
                className="btn-primary !px-5 !py-2.5 text-xs"
                data-cursor="VIEW"
              >
                {chrome.ctaLabel} <FileText className="h-3.5 w-3.5" />
              </Link>
            </ClipReveal>
          )}
        </div>

        {tenders.length === 0 ? (
          <ClipReveal direction="up" delay={0.08} className="w-full">
            <article className="relative overflow-hidden rounded-[1.75rem] border border-line bg-cream shadow-[0_40px_90px_-48px_rgba(8,19,31,0.45)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
              <div className="grid lg:grid-cols-12">
                <div className="relative overflow-hidden bg-gradient-to-br from-navy-mid via-navy to-navy-deep p-6 text-white sm:p-8 lg:col-span-5">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/15 blur-3xl" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-soft">
                    Public procurement
                  </p>
                  <h3 className="mt-4 max-w-sm font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    Tender listings will be published here
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
                    Open RFPs and live notices will appear in this section once
                    they are added from the admin desk.
                  </p>
                </div>
                <div className="flex flex-col justify-between gap-6 bg-cream-warm/60 p-6 sm:p-8 lg:col-span-7">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold-label">
                      Tender portal
                    </p>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                      Browse current notices, issuing authorities, closing
                      dates, and document guidance on the full portal.
                    </p>
                  </div>
                  <Link
                    href={portalHref}
                    className="group inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-b from-gold-soft to-gold px-5 py-2.5 text-xs font-bold text-navy-deep shadow-[0_12px_28px_-14px_rgba(201,168,75,0.85)] transition-transform hover:scale-[1.02]"
                    data-cursor="VIEW"
                  >
                    Open tender portal
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </article>
          </ClipReveal>
        ) : (
          <>
            <ClipReveal direction="up" delay={0.08}>
              <div className="hidden overflow-x-auto rounded-xl border border-line md:block">
                <table className="w-full text-left text-sm">
                  <thead className="bg-navy text-[11px] uppercase tracking-wider text-white">
                    <tr>
                      <th className="p-3.5 font-semibold">Status</th>
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
                    {tenders.map((tnd) => (
                      <tr
                        key={tnd.id}
                        className="group transition-colors hover:bg-cream/90"
                      >
                        <td className="p-3.5">
                          <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-muted">
                            <span
                              className={`h-2 w-2 rounded-full ${statusDot(tnd.status)}`}
                              aria-hidden
                            />
                            {tnd.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap p-3.5 font-mono text-xs font-bold text-gold-label">
                          {tnd.tenderNo}
                        </td>
                        <td className="max-w-xs p-3.5 font-semibold text-navy">
                          {tnd.title}
                        </td>
                        <td className="p-3.5 text-xs text-muted">
                          {tnd.issuingAuthority}
                        </td>
                        <td className="p-3.5 text-xs">{tnd.state}</td>
                        <td className="whitespace-nowrap p-3.5 text-xs font-bold text-emerald-dark">
                          {tnd.estimatedCost}
                        </td>
                        <td className="whitespace-nowrap p-3.5 text-xs font-bold text-amber">
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
            </ClipReveal>

            <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-white md:hidden">
              {tenders.map((tnd, i) => (
                <ClipReveal key={tnd.id} direction="up" delay={0.04 * i}>
                  <Link
                    href="/tenders"
                    className="block space-y-1.5 p-4 hover:bg-cream/80"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-muted">
                        <span
                          className={`h-2 w-2 rounded-full ${statusDot(tnd.status)}`}
                        />
                        {tnd.status}
                      </span>
                      <span className="font-mono text-[11px] font-bold text-gold-label">
                        {tnd.tenderNo}
                      </span>
                    </div>
                    <h4 className="font-display text-sm font-bold text-navy">
                      {tnd.title}
                    </h4>
                    <div className="flex justify-between pt-1 text-xs">
                      <span className="font-bold text-emerald-dark">
                        {tnd.estimatedCost}
                      </span>
                      <span className="font-bold text-amber">
                        {tnd.closingDate}
                      </span>
                    </div>
                  </Link>
                </ClipReveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
