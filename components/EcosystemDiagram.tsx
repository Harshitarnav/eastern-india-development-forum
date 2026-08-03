"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Network, Building2, Landmark, Users, GraduationCap, Coins, Sprout, Briefcase } from "lucide-react";

interface NodeItem {
  id: string;
  title: string;
  role: string;
  icon: React.ReactNode;
  color: string;
  metrics: string;
}

export const EcosystemDiagram: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>("govt");

  const nodes: NodeItem[] = [
    {
      id: "govt",
      title: "Government Bodies",
      role: "Policy formulation, statutory clearances, land allotment, state subsidies & single-window approvals.",
      icon: <Landmark className="h-6 w-6 text-gold" />,
      color: "border-gold bg-gold/10 text-gold",
      metrics: "38+ Govt Partnerships",
    },
    {
      id: "investors",
      title: "Global Investors & Funds",
      role: "FDI capital, private equity, impact funds, infrastructure grants & project finance.",
      icon: <Coins className="h-6 w-6 text-emerald" />,
      color: "border-emerald bg-emerald/10 text-emerald",
      metrics: "₹4,500 Cr+ Pledged",
    },
    {
      id: "industry",
      title: "Industrial Enterprises",
      role: "Anchor manufacturing units, EV supply chains, logistics parks & employment generation.",
      icon: <Building2 className="h-6 w-6 text-blue-400" />,
      color: "border-blue-400 bg-blue-400/10 text-blue-400",
      metrics: "260+ Enterprise Units",
    },
    {
      id: "startups",
      title: "Startups & Innovators",
      role: "Agri-tech solutions, renewable micro-grids, digital public infrastructure & tech incubators.",
      icon: <Sprout className="h-6 w-6 text-amber" />,
      color: "border-amber bg-amber/10 text-amber",
      metrics: "1,850+ Startups",
    },
    {
      id: "academics",
      title: "Academic & R&D Bodies",
      role: "NSDC vocational curricula, patent facilitation, skill labs & university partnerships.",
      icon: <GraduationCap className="h-6 w-6 text-purple-400" />,
      color: "border-purple-400 bg-purple-400/10 text-purple-400",
      metrics: "45 Academic Partners",
    },
    {
      id: "citizens",
      title: "NGOs & Diaspora Network",
      role: "Community mobilization, women empowerment, heritage conservation & grassroots feedback.",
      icon: <Users className="h-6 w-6 text-pink-400" />,
      color: "border-pink-400 bg-pink-400/10 text-pink-400",
      metrics: "1.2M+ Beneficiaries",
    },
  ];

  const currentNode = nodes.find((n) => n.id === activeNode) || nodes[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy-deep via-navy to-slate-dark p-8 shadow-2xl text-white">
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">
            EIDF Multi-Stakeholder Engine
          </span>
          <h3 className="font-display text-3xl font-bold text-white mt-1">
            The Integrated Eastern India Ecosystem
          </h3>
          <p className="text-xs text-white/70 mt-2">
            Connecting seven critical development pillars through a centralized facilitation hub.
          </p>
        </div>

        {/* Central Hub & Surrounding Nodes Visualizer */}
        <div className="grid gap-6 lg:grid-cols-12 items-center">
          {/* Node Selector Cards */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-3">
            {nodes.map((node) => {
              const isActive = node.id === activeNode;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(node.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "border-gold bg-white/15 scale-105 shadow-xl glow-gold"
                      : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="mb-2 p-2 rounded-xl bg-navy-deep">{node.icon}</div>
                  <h4 className="font-display text-xs font-bold text-white mb-1">{node.title}</h4>
                  <span className="text-[10px] text-white/60 font-mono">{node.metrics}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed Role Spotlight */}
          <div className="lg:col-span-5">
            <motion.div
              key={currentNode.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-2xl border ${currentNode.color}`}>
                  {currentNode.icon}
                </div>
                <div>
                  <h4 className="font-display text-xl font-bold text-white">
                    {currentNode.title}
                  </h4>
                  <span className="text-xs font-semibold text-emerald">{currentNode.metrics}</span>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-white/80 mb-6">
                {currentNode.role}
              </p>

              <div className="rounded-xl bg-navy-deep/80 p-3.5 border border-white/10">
                <div className="flex items-center gap-2 text-[11px] text-gold font-bold uppercase tracking-wider mb-1">
                  <Network className="h-3.5 w-3.5 text-gold" /> EIDF Synergy Role
                </div>
                <p className="text-[11px] text-white/70">
                  Acts as the single point of coordination, ensuring accelerated approvals, capital security, and transparent reporting.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
