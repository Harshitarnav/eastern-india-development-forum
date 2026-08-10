"use client";

import {
  Building2,
  Coins,
  Landmark,
  Lightbulb,
  GraduationCap,
  Leaf,
  Factory,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

const pillars = [
  { icon: Building2, label: "Infrastructure", color: "text-sky-600 bg-sky-50 border-sky-100" },
  { icon: Coins, label: "Investment", color: "text-amber-600 bg-amber-50 border-amber-100" },
  { icon: Landmark, label: "Government", color: "text-navy bg-navy/5 border-navy/10" },
  { icon: Lightbulb, label: "Innovation", color: "text-gold bg-gold/10 border-gold/20" },
  { icon: GraduationCap, label: "Education", color: "text-emerald-dark bg-emerald/10 border-emerald/20" },
  { icon: Leaf, label: "Environment", color: "text-emerald bg-emerald/10 border-emerald/20" },
  { icon: Factory, label: "Industry", color: "text-navy-mid bg-cream-warm border-line" },
];

export function LoginHeroPanel() {
  return (
    <aside className="relative hidden min-h-screen w-[48%] flex-col overflow-hidden border-r border-line bg-gradient-to-br from-white via-[#f0f7ff] to-[#e8f8f1] lg:flex xl:w-[50%]">
      {/* Soft logo-inspired glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-10 h-72 w-72 rounded-full bg-sky-300/25 blur-[90px]" />
        <div className="absolute top-1/3 right-0 h-64 w-64 rounded-full bg-gold/20 blur-[80px]" />
        <div className="absolute bottom-10 left-1/4 h-56 w-56 rounded-full bg-emerald/20 blur-[80px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/[0.04] to-transparent" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-between p-10 xl:p-12">
        <div className="flex items-center gap-3">
          <BrandLogo size="xl" className="shadow-md" priority />
          <div className="min-w-0">
            <div className="font-display text-lg font-bold text-navy">
              Eastern India Development Forum
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald" />
              Secure Admin Console
            </div>
          </div>
        </div>

        <div className="max-w-xl space-y-5 py-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-700">
            <Sparkles className="h-3.5 w-3.5" />
            Enterprise CMS Access
          </div>

          <h1 className="font-display text-4xl font-extrabold leading-[1.15] tracking-tight text-navy xl:text-[2.75rem]">
            Building the Future of{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-sky-600 to-amber-500 bg-clip-text text-transparent">
              Eastern India
            </span>
          </h1>

          <p className="max-w-md text-[15px] leading-relaxed text-muted">
            Authorized operators manage projects, schemes, tenders, investment corridors,
            and institutional content across Bihar, Jharkhand, Odisha, West Bengal, Assam,
            and the North East.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {pillars.map((item) => (
              <div
                key={item.label}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${item.color}`}
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { label: "States & UTs", value: "8+", accent: "text-navy" },
              { label: "Capital Pipeline", value: "₹25K Cr", accent: "text-amber-600" },
              { label: "Uptime Target", value: "99.9%", accent: "text-emerald-dark" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white bg-white/80 px-3 py-3 shadow-sm backdrop-blur-sm"
              >
                <div className={`font-display text-lg font-bold ${stat.accent}`}>
                  {stat.value}
                </div>
                <div className="mt-0.5 text-[11px] leading-tight font-medium text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted">
          © {new Date().getFullYear()} EIDF · Powered by Umanand Eastern Foundation
        </p>
      </div>
    </aside>
  );
}
