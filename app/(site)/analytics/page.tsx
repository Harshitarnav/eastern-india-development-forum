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
import { BarChart3, PieChart as PieIcon, TrendingUp, IndianRupee } from "lucide-react";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";

export default function AnalyticsPage() {
  const stateCapitalData = [
    { name: "Odisha", capital: 14800 },
    { name: "Jharkhand", capital: 11200 },
    { name: "West Bengal", capital: 9500 },
    { name: "Bihar", capital: 8400 },
    { name: "Assam", capital: 6100 },
    { name: "NE States", capital: 4200 },
  ];

  const sectorData = [
    { name: "Infrastructure & Ports", value: 35, color: "#f59e0b" },
    { name: "Renewable Energy", value: 25, color: "#10b981" },
    { name: "Manufacturing & SEZ", value: 20, color: "#3b82f6" },
    { name: "Agri-Tech & Skilling", value: 20, color: "#8b5cf6" },
  ];

  const kpiCards = [
    { label: "Total Pledged Capital", value: "₹54,200 Cr", hint: "Across 6 state clusters", icon: IndianRupee, color: "text-gold" },
    { label: "YoY Capital Growth", value: "+24%", hint: "Regional pipeline expansion", icon: TrendingUp, color: "text-emerald" },
    { label: "Active PPP Corridors", value: "42", hint: "Under facilitation", icon: BarChart3, color: "text-navy" },
  ];

  return (
    <>
      <PageHero
        crumb="Home / Analytics"
        eyebrow="EIDF Regional Data Platform"
        title="Development Analytics Dashboard"
        description="Real-time visual analysis of capital deployment, state-wise project funding, sector breakdown, and UN SDG alignment metrics."
      >
        <Link
          href="/investors"
          className="rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-navy-deep shadow-xl transition-transform hover:scale-105 hover:bg-gold-hover"
        >
          Explore Investment Zones
        </Link>
        <Link
          href="/resources"
          className="rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
        >
          Download Reports
        </Link>
      </PageHero>

      {/* KPI cards */}
      <section className="relative z-10 -mt-8 px-4 md:-mt-10">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
          {kpiCards.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-3xl border border-line bg-white/95 p-6 shadow-xl backdrop-blur-xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  {kpi.label}
                </span>
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
              <div className={`font-display text-3xl font-extrabold ${kpi.color}`}>
                {kpi.value}
              </div>
              <div className="mt-1 text-xs text-muted">{kpi.hint}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl space-y-10">
          <SectionHeader
            eyebrow="Capital Intelligence"
            title="Where capital is flowing across Eastern India"
          />

          <div className="grid gap-8 lg:grid-cols-12">
            {/* Bar Chart */}
            <div className="space-y-4 rounded-3xl border border-line bg-white p-6 shadow-xl md:p-8 lg:col-span-7">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-navy md:text-xl">
                  <BarChart3 className="h-5 w-5 text-gold" />
                  Pledged Capital by State (₹ Cr)
                </h3>
              </div>
              <div className="h-80 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stateCapitalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0b192c",
                        borderColor: "#f59e0b",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="capital" fill="#0b192c" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="space-y-4 rounded-3xl border border-line bg-white p-6 shadow-xl md:p-8 lg:col-span-5">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-navy md:text-xl">
                  <PieIcon className="h-5 w-5 text-emerald" />
                  Sector Capital Share
                </h3>
              </div>
              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
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

              <div className="grid grid-cols-1 gap-2 pt-2 text-xs sm:grid-cols-2">
                {sectorData.map((sec) => (
                  <div key={sec.name} className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: sec.color }}
                    />
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
        description="Pair analytics with live investment zones and scheme assistance for actionable decisions."
        primary={{ label: "Explore Investment Zones", href: "/investors" }}
        secondary={{ label: "Talk to Analyst Desk", href: "/contact" }}
      />
    </>
  );
}
