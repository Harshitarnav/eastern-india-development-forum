import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Creatives",
  description: "Seminar poster template and membership card for EIDF.",
};

export default function CreativesPage() {
  return (
    <div className="bg-cream px-6 py-14 md:px-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-2 text-xs font-bold tracking-[2px] text-gold-label">
          SUPPORTING CREATIVES
        </div>
        <h1 className="mb-3 font-display text-3xl md:text-4xl">Poster & Membership Card</h1>
        <p className="mb-10 max-w-2xl text-[15px] text-muted">
          Print-ready templates in the same brand system as the website.{" "}
          <Link href="/" className="font-semibold text-navy">
            ← Back to site
          </Link>
        </p>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Seminar poster */}
          <div>
            <div className="mb-3 text-sm font-bold text-muted">Seminar Poster</div>
            <div className="overflow-hidden rounded-2xl bg-navy shadow-xl border border-line">
              <img src="/images/eidf_poster.jpg" alt="EIDF Seminar Poster" className="w-full h-auto object-contain" />
            </div>
          </div>

          {/* Membership card */}
          <div>
            <div className="mb-3 text-sm font-bold text-muted">Membership Card</div>
            <div className="flex flex-col gap-5">
              <div className="flex min-h-[214px] h-auto flex-col justify-between rounded-2xl bg-navy p-6 text-white shadow-xl">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold font-display text-[13px] font-bold text-navy-deep">
                      EI
                    </div>
                    <div className="font-display text-[13px] leading-tight">
                      Eastern India
                      <br />
                      Development Forum
                    </div>
                  </div>
                  <div className="text-[10px] tracking-[1.5px] text-gold">MEMBER</div>
                </div>
                <div className="mt-4">
                  <div className="mb-1 font-display text-lg">Aarav Mahato</div>
                  <div className="text-[11px] text-white/80">
                    Global Patron · ID EIDF-000482
                  </div>
                </div>
              </div>

              <div className="flex min-h-[214px] h-auto gap-4 rounded-2xl bg-cream-warm p-5 shadow-xl">
                <div className="flex-1">
                  <div className="mb-2 text-[10px] font-bold tracking-[1.5px] text-gold-label">
                    MEMBER BENEFITS
                  </div>
                  <div className="text-[11px] leading-loose text-ink/80">
                    Priority project briefings
                    <br />
                    Annual convention invite
                    <br />
                    Recognition on our website
                    <br />
                    Direct line to the secretariat
                  </div>
                  <div className="mt-3 text-[10px] text-muted">
                    hello@eidf.org.in · eidf.org.in
                  </div>
                </div>
                <div className="h-[70px] w-[70px] shrink-0 rounded-md bg-[repeating-linear-gradient(45deg,oklch(88%_0.01_85),oklch(88%_0.01_85)_6px,oklch(92%_0.008_85)_6px,oklch(92%_0.008_85)_12px)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
