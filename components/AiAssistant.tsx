"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, FileText, Briefcase, Building2 } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  links?: { label: string; href: string }[];
}

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Namaste! I am the EIDF Smart Development Assistant. How can I facilitate your vision for Eastern India today?",
      links: [
        { label: "Search Open Tenders", href: "/tenders" },
        { label: "Check State Subsidies", href: "/schemes" },
        { label: "Submit Project Proposal", href: "/proposals/submit" },
      ],
    },
  ]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");

    // Simple automated intelligent routing
    setTimeout(() => {
      let botReply = "";
      let links: { label: string; href: string }[] | undefined = undefined;

      const qLower = query.toLowerCase();
      if (qLower.includes("tender") || qLower.includes("rfp") || qLower.includes("bid")) {
        botReply =
          "EIDF facilitates active tenders across Bihar, Jharkhand, Odisha, West Bengal, and Assam. You can explore open RFPs, download documentation, or access tender guidance.";
        links = [
          { label: "View Tender Portal", href: "/tenders" },
          { label: "Request Tender Assistance", href: "/contact?intent=tender_guidance" },
        ];
      } else if (qLower.includes("invest") || qLower.includes("fdi") || qLower.includes("ppp") || qLower.includes("park")) {
        botReply =
          "We offer direct investment matching for Industrial Parks, SEZs, and PPP Projects across Eastern India with state-level capital subsidies up to 30%.";
        links = [
          { label: "Explore Investor Portal", href: "/investors" },
          { label: "View Analytics Dashboard", href: "/analytics" },
        ];
      } else if (qLower.includes("scheme") || qLower.includes("subsidy") || qLower.includes("grant")) {
        botReply =
          "State and central government schemes provide capital interest subvention, stamp duty exemptions, and startup seed grants.";
        links = [{ label: "Browse Schemes Directory", href: "/schemes" }];
      } else if (qLower.includes("proposal") || qLower.includes("submit") || qLower.includes("project")) {
        botReply =
          "Have a development project in mind? You can submit your proposal directly to the EIDF Project Facilitation Board for funding, land allotment, or partnership.";
        links = [{ label: "Submit Development Proposal", href: "/proposals/submit" }];
      } else {
        botReply =
          "EIDF connects Governments, Investors, Enterprises, and NGOs to accelerate sustainable growth. What specific domain or state would you like to explore?";
        links = [
          { label: "Browse Focus Areas", href: "/#focus-areas" },
          { label: "Become a Member", href: "/membership" },
        ];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: botReply,
          links,
        },
      ]);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-navy-deep via-navy to-navy-light px-5 py-3.5 text-white shadow-2xl glow-gold border border-gold/40 cursor-pointer"
      >
        <div className="relative">
          <Bot className="h-5 w-5 text-gold animate-bounce" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald shadow-[0_0_6px_#10b981]" />
        </div>
        <span className="font-display text-xs font-bold tracking-wider uppercase text-white">
          EIDF AI Assistant
        </span>
      </motion.button>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="flex h-full w-full sm:max-w-md flex-col border-l border-white/10 bg-navy-deep text-white shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 p-4 bg-navy">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 text-gold border border-gold/30">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-white">
                      EIDF Development Assistant
                    </h3>
                    <p className="text-[11px] text-emerald font-medium">Online · AI Portal Facilitator</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2 overflow-x-auto border-b border-white/10 p-3 bg-navy-deep text-xs">
                <button
                  onClick={() => handleSend("Tell me about open tenders")}
                  className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/80 hover:border-gold hover:text-gold"
                >
                  <FileText className="h-3 w-3 text-gold" /> Tenders
                </button>
                <button
                  onClick={() => handleSend("What investment opportunities exist?")}
                  className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/80 hover:border-emerald hover:text-emerald"
                >
                  <Briefcase className="h-3 w-3 text-emerald" /> Investors
                </button>
                <button
                  onClick={() => handleSend("How to submit a project proposal?")}
                  className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/80 hover:border-white hover:text-white"
                >
                  <Building2 className="h-3 w-3 text-white" /> Proposals
                </button>
              </div>

              {/* Messages Scroll Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                        m.sender === "user"
                          ? "bg-gold text-navy-deep font-semibold rounded-tr-none shadow-md"
                          : "bg-navy-mid/80 text-white/90 border border-white/10 rounded-tl-none shadow-md"
                      }`}
                    >
                      {m.text}
                    </div>

                    {/* Interactive Link Pills */}
                    {m.links && m.links.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5 pl-1">
                        {m.links.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg border border-gold/40 bg-gold/10 px-2.5 py-1 text-[11px] font-bold text-gold hover:bg-gold hover:text-navy-deep transition-all"
                          >
                            {link.label} →
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="border-t border-white/10 p-3 bg-navy">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about tenders, schemes, investment..."
                    className="flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-xs text-white placeholder-white/40 focus:border-gold focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-navy-deep hover:bg-gold-hover shadow-md cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
