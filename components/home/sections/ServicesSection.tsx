"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  FileText,
  LayoutDashboard,
  Briefcase,
  Building2,
  BookOpen,
  Users,
  BarChart3,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { ClipReveal, usePrefersReducedMotion } from "@/components/motion";
import type { CmsHomepageSettings } from "@/lib/cms/types";

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

type ServiceItem = {
  id?: string;
  label: string;
  desc: string;
  href: string;
  iconName: string;
};

type ServicesSectionProps = {
  services: ServiceItem[];
  chrome: CmsHomepageSettings["onlineServices"];
};

function ServiceCell({
  service,
  reduced,
}: {
  service: ServiceItem;
  reduced: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const Icon = serviceIcons[service.iconName] || FileText;

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    if (window.matchMedia("(pointer: fine)").matches === false) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.1;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.1;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <Link
      ref={ref}
      href={service.href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-cursor="VIEW"
      className="group relative flex flex-col items-center gap-3 rounded-xl border border-line bg-white px-3 py-6 text-center shadow-[0_1px_2px_rgba(10,31,61,0.03)] transition-[transform,background-color,box-shadow,border-color] duration-300 will-change-transform hover:z-10 hover:-translate-y-1 hover:border-gold/45 hover:bg-cream hover:shadow-[0_16px_36px_-18px_rgba(10,31,61,0.22)]"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-gold shadow-sm transition-colors duration-300 group-hover:bg-navy-deep group-hover:text-gold">
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-xs font-bold leading-snug text-navy">
        {service.label}
      </span>
      <span className="hidden text-[10px] leading-relaxed text-muted sm:block">
        {service.desc}
      </span>
    </Link>
  );
}

export function ServicesSection({ services, chrome }: ServicesSectionProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="online-services"
      className="relative border-b border-line bg-white"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-12">
        <ClipReveal
          direction="up"
          className="mb-6 flex items-end justify-between gap-3"
        >
          <div>
            <p className="section-eyebrow mb-2">{chrome.title}</p>
            <p className="hidden text-sm text-muted sm:block">
              Quick access to portals and programmes
            </p>
          </div>
          <Link href={chrome.helpHref} className="eidf-link text-xs shrink-0">
            {chrome.helpLabel}
          </Link>
        </ClipReveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {services.map((s) => (
            <ServiceCell
              key={s.id || s.href}
              service={s}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
