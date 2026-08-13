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
    const x = (e.clientX - rect.left - rect.width / 2) * 0.12;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.12;
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
      className="group relative flex flex-col items-center gap-2.5 bg-white px-3 py-6 text-center transition-[transform,background-color,box-shadow] duration-200 will-change-transform hover:z-10 hover:bg-cream hover:shadow-[inset_0_0_0_1px_var(--gold)]"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-navy text-gold transition-colors group-hover:bg-navy-deep">
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-xs font-bold text-navy">{service.label}</span>
      <span className="hidden text-[10px] leading-tight text-muted sm:block">
        {service.desc}
      </span>
    </Link>
  );
}

export function ServicesSection({ services, chrome }: ServicesSectionProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        <ClipReveal direction="up" className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-label">
            {chrome.title}
          </h2>
          <Link
            href={chrome.helpHref}
            className="text-xs font-bold text-navy transition-colors hover:text-gold"
          >
            {chrome.helpLabel}
          </Link>
        </ClipReveal>

        <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4 lg:grid-cols-8">
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
