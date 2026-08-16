"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ClipReveal, usePrefersReducedMotion } from "@/components/motion";
import { SectionHeader } from "@/components/ui";
import type { FAQItem } from "@/content/site";
import type { CmsHomepageSectionCopy } from "@/lib/cms/types";

type FaqSectionProps = {
  faqs: FAQItem[];
  chrome: CmsHomepageSectionCopy;
};

export function FaqSection({ faqs, chrome }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string>(faqs[0]?.id || "");
  const reduced = usePrefersReducedMotion();

  return (
    <section className="border-y border-line bg-cream-warm px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <ClipReveal direction="up">
          <SectionHeader
            eyebrow={chrome.eyebrow}
            title={chrome.title}
            align="left"
          />
        </ClipReveal>

        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id;
            const num = String(i + 1).padStart(2, "0");
            return (
              <ClipReveal key={faq.id} direction="up" delay={0.04 * i}>
                <div
                  className={`overflow-hidden rounded-xl border transition-colors ${
                    isOpen
                      ? "border-gold/40 bg-white"
                      : "border-line bg-white/80"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? "" : faq.id)}
                    className="flex w-full items-start gap-4 p-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <motion.span
                      className="font-display text-xl font-extrabold text-gold tabular-nums"
                      animate={
                        reduced
                          ? undefined
                          : { rotate: isOpen ? 0 : -8, scale: isOpen ? 1.05 : 1 }
                      }
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {num}
                    </motion.span>
                    <span className="flex-1 pt-0.5 text-sm font-bold text-navy">
                      {faq.question}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={
                          reduced ? false : { height: 0, opacity: 0 }
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={
                          reduced
                            ? { opacity: 0 }
                            : { height: 0, opacity: 0 }
                        }
                        transition={{
                          duration: reduced ? 0.15 : 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-line/60 px-5 pb-5 pl-[4.25rem] pt-3 text-sm leading-relaxed text-muted">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ClipReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
