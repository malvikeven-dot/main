"use client";

import { motion } from "framer-motion";
import { UserCheck, Wallet, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function HowItWorks() {
  const { t } = useI18n();

  const steps = [
    {
      number: "01",
      icon: UserCheck,
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
    },
    {
      number: "02",
      icon: Wallet,
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
    },
    {
      number: "03",
      icon: Send,
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* BG gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(45,106,255,0.06) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            {t.howItWorks.tag}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-16"
        >
          {t.howItWorks.headline}
        </motion.h2>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

          <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                {/* Step circle */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl glass-blue flex items-center justify-center border border-blue-400/30 glow-blue-sm">
                    <step.icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
                    {i + 1}
                  </div>
                </div>

                <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-white/50 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
