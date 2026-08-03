"use client";

import React from "react";
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
import { TrendingUp, PieChart as PieIcon, BarChart3, ShieldCheck } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-cream py-16 px-4">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="rounded-3xl border border-line bg-gradient-to-br from-navy-deep via-navy to-slate-dark text-white p-8 md:p-12 shadow-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">
            EIDF REGIONAL DATA PLATFORM
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white">
            Development Analytics Dashboard
          </h1>
          <p className="text-sm text-white/80 max-w-2xl leading-relaxed">
            Real-time visual analysis of capital deployment, state-wise project funding, sector breakdown, and UN SDG alignment metrics.
          </p>
        </div>

        {/* Analytics Charts Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Bar Chart: State Capital Allocation */}
          <div className="lg:col-span-7 rounded-3xl border border-line bg-white p-6 md:p-8 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-display text-xl font-bold text-navy flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-gold" /> Pledged Capital Allocation by State (₹ Crores)
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

          {/* Pie Chart: Sector Distribution */}
          <div className="lg:col-span-5 rounded-3xl border border-line bg-white p-6 md:p-8 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-display text-xl font-bold text-navy flex items-center gap-2">
                <PieIcon className="h-5 w-5 text-emerald" /> Sector Capital Share (%)
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

            <div className="grid grid-cols-2 gap-2 text-xs pt-2">
              {sectorData.map((sec) => (
                <div key={sec.name} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: sec.color }} />
                  <span className="text-muted font-medium">{sec.name} ({sec.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
