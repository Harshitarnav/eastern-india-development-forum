import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, IdCard, ImageIcon } from "lucide-react";
import { CtaBand, PageHero } from "@/components/ui";
import { getPublicCmsBundle } from "@/lib/cms/server";
import { buildPageMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/creatives", {
    title: "Brand Creatives",
    description: "Seminar poster template and membership card for EIDF.",
  });
}

export default async function CreativesPage() {
  const { site } = await getPublicCmsBundle();
  return (
    <>
      <PageHero
        crumb="Home / Creatives"
        eyebrow="Brand Assets"
        title="Poster & Membership Card"
        description="Print-ready templates in the same brand system as the website — for seminars, conventions, and member recognition."
        compact
      >
        <Link href="/" className="btn-secondary inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>
        <Link href="/gallery" className="btn-primary">
          Browse Media Hub
        </Link>
      </PageHero>

      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border border-gold/30 bg-gold/10 text-gold">
                <ImageIcon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-label">
                  Print Template
                </div>
                <div className="font-display text-lg font-bold text-navy">Seminar Poster</div>
              </div>
            </div>
            <div className="overflow-hidden rounded-sm border border-line bg-navy">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/eidf_poster.jpg"
                alt="EIDF Seminar Poster"
                className="h-auto w-full object-contain"
              />
            </div>
            <a
              href="/images/eidf_poster.jpg"
              download
              className="btn-navy mt-5 inline-flex"
            >
              <Download className="h-4 w-4 text-gold" /> Download Poster
            </a>
          </div>

          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border border-emerald/30 bg-emerald/10 text-emerald">
                <IdCard className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-dark">
                  Member Identity
                </div>
                <div className="font-display text-lg font-bold text-navy">Membership Card</div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="relative flex min-h-[214px] flex-col justify-between overflow-hidden rounded-sm eidf-depth p-6 text-white eidf-grain">
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/15 blur-2xl" />
                <div className="relative flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center bg-gold font-display text-sm font-bold text-navy-deep">
                      EI
                    </div>
                    <div className="font-display text-[13px] leading-tight">
                      Eastern India
                      <br />
                      Development Forum
                    </div>
                  </div>
                  <div className="border border-gold/40 bg-gold/10 px-2.5 py-1 text-[10px] font-bold tracking-[1.5px] text-gold">
                    MEMBER
                  </div>
                </div>
                <div className="relative mt-4">
                  <div className="mb-1 font-display text-xl font-bold">Aarav Mahato</div>
                  <div className="text-xs text-white/75">Global Patron · ID EIDF-000482</div>
                </div>
              </div>

              <div className="flex min-h-[214px] gap-4 rounded-sm border border-line bg-cream-warm p-6">
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-px w-6 bg-gold" aria-hidden />
                    <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-label">
                      Member Benefits
                    </div>
                  </div>
                  <div className="space-y-1.5 text-xs leading-relaxed text-ink/80">
                    <div>Priority project briefings</div>
                    <div>Annual convention invite</div>
                    <div>Recognition on our website</div>
                    <div>Direct line to the secretariat</div>
                  </div>
                  <div className="mt-4 text-[10px] text-muted">
                    {site.email} · eidf.org.in
                  </div>
                </div>
                <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center border border-line bg-white">
                  <div className="font-mono text-[9px] text-muted">QR</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to carry the EIDF membership card?"
        description="Apply to join the network and receive your digital member credentials."
        primary={{ label: "Become a Member", href: "/membership" }}
        secondary={{ label: "Contact Secretariat", href: "/contact" }}
      />
    </>
  );
}
