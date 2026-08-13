"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
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
  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-4">
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
                href={chrome.ctaHref || "/tenders"}
                className="btn-primary !px-5 !py-2.5 text-xs"
                data-cursor="VIEW"
              >
                {chrome.ctaLabel} <FileText className="h-3.5 w-3.5" />
              </Link>
            </ClipReveal>
          )}
        </div>

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
              <Link href="/tenders" className="block space-y-1.5 p-4 hover:bg-cream/80">
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
                  <span className="font-bold text-amber">{tnd.closingDate}</span>
                </div>
              </Link>
            </ClipReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
