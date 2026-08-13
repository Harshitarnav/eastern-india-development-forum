"use client";

import { motion } from "framer-motion";
import { ImpactCounter } from "@/components/ImpactCounter";
import { ClipReveal, useAllowMotion } from "@/components/motion";

type ImpactStat = {
  key: string;
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
};

type ImpactSectionProps = {
  impactStats: ImpactStat[];
};

export function ImpactSection({ impactStats }: ImpactSectionProps) {
  const allowMotion = useAllowMotion();
  const stats = impactStats || [];

  return (
    <section className="relative overflow-hidden bg-navy-deep px-4 py-16 text-white md:py-24">
      <div className="pointer-events-none absolute inset-0 eidf-depth opacity-80" />
      <div className="pointer-events-none absolute inset-0 eidf-grain opacity-40" />
      <div className="pointer-events-none absolute inset-y-0 left-1/4 w-px bg-gradient-to-b from-transparent via-gold/35 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-1/3 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <ClipReveal direction="left" className="mb-10 md:mb-14">
          <p className="section-eyebrow text-gold">Impact Evidence</p>
          <h2 className="mt-4 max-w-xl font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
            Measurable outcomes across Eastern India
          </h2>
        </ClipReveal>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/10 pt-10 md:grid-cols-4 lg:grid-cols-7 lg:gap-x-4">
          {stats.map((st, i) => (
            <motion.div
              key={st.key || `stat-${i}`}
              className="relative border-l border-white/10 pl-4"
              initial={allowMotion ? { opacity: 1, scale: 0.94, y: 16 } : false}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: allowMotion ? i * 0.05 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className={`font-display text-3xl font-extrabold tracking-tight md:text-4xl lg:text-[2.65rem] ${
                  i % 3 === 0
                    ? "text-white"
                    : i % 3 === 1
                      ? "text-emerald"
                      : "text-gold"
                }`}
              >
                <ImpactCounter
                  value={st.value}
                  prefix={st.prefix}
                  suffix={st.suffix}
                />
              </div>
              <div className="mt-2.5 text-[10px] font-semibold uppercase leading-tight tracking-wide text-white/50">
                {st.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
