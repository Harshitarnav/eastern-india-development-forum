"use client";

import React from "react";
import Link from "next/link";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import { BarChart3, PieChart as PieIcon } from "lucide-react";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";
import { usePublicSite } from "@/lib/cms/public-provider";

export default function AnalyticsPage() {
  const site = usePublicSite();
  const stateCapitalData = site.analytics?.stateCapital ?? [
    { name: "Odisha", capital: 14800 },
    { name: "Jharkhand", capital: 11200 },
    { name: "West Bengal", capital: 9500 },
    { name: "Bihar", capital: 8400 },
    { name: "Assam", capital: 6100 },
    { name: "NE States", capital: 4200 },
  ];

  const sectorData = site.analytics?.sectors ?? [
    { name: "Infrastructure & Ports", value: 35, color: "#e8a317" },
    { name: "Renewable Energy", value: 25, color: "#0d9f6e" },
    { name: "Manufacturing & SEZ", value: 20, color: "#2e75b6" },
    { name: "Agri-Tech & Skilling", value: 20, color: "#f07a1a" },
  ];

  const totalCapital = stateCapitalData.reduce((sum, row) => sum + row.capital, 0);
  const corridors = site.impactStats.find((s) =>
    /project|corridor/i.test(s.label)
  );

  return (
    <>
      <PageHero
        crumb="Home / Analytics"
        title="Development Analytics"
        description="Capital deployment, state-wise funding, and sector breakdown across Eastern India."
      >
        <Link href="/investors" className="btn-primary">
          Explore Investment Zones
        </Link>
        <Link href="/resources" className="btn-secondary">
          Download Reports
        </Link>
      </PageHero>

      <section className="metric-strip grid-cols-3">
        <div>
          <div className="font-display text-2xl md:text-3xl font-extrabold text-navy">
            ₹{totalCapital.toLocaleString("en-IN")} Cr
          </div>
          <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
            Total Pledged Capital
          </div>
        </div>
        <div>
          <div className="font-display text-2xl md:text-3xl font-extrabold text-emerald-dark">
            {stateCapitalData.length}
          </div>
          <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
            States &amp; Regions Tracked
          </div>
        </div>
        <div>
          <div className="font-display text-2xl md:text-3xl font-extrabold text-navy">
            {corridors?.value ?? site.projects.length}
          </div>
          <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
            Active PPP Corridors
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl space-y-10">
          <SectionHeader
            eyebrow="Capital Intelligence"
            title="Where capital is flowing"
            align="left"
          />

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="border border-line bg-white p-5 md:p-7 lg:col-span-7">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-navy border-b border-line pb-3">
                <BarChart3 className="h-5 w-5 text-gold" />
                Pledged Capital by State (₹ Cr)
              </h3>
              <div className="h-80 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stateCapitalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eef3f8" />
                    <XAxis dataKey="name" stroke="#5b6b7c" fontSize={12} />
                    <YAxis stroke="#5b6b7c" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0a1f3d",
                        borderColor: "#e8a317",
                        borderRadius: "4px",
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="capital" fill="#0a1f3d" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="border border-line bg-white p-5 md:p-7 lg:col-span-5">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-navy border-b border-line pb-3">
                <PieIcon className="h-5 w-5 text-emerald" />
                Sector Capital Share
              </h3>
              <div className="h-64 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {sectorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-1 gap-2 pt-2 text-xs">
                {sectorData.map((sec) => (
                  <div key={sec.name} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 shrink-0" style={{ backgroundColor: sec.color }} />
                    <span className="font-medium text-muted">
                      {sec.name} ({sec.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Use this data to guide your next investment"
        description="Pair analytics with live investment zones and scheme assistance."
        primary={{ label: "Explore Investment Zones", href: "/investors" }}
        secondary={{ label: "Talk to Analyst Desk", href: "/contact" }}
      />
    </>
  );
}
