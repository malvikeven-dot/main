"use client";

import { motion } from "framer-motion";
import { X, Check, Clock, DollarSign } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function ProblemSolution() {
  const { t } = useI18n();

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            {t.problem.tag}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-6 leading-tight"
        >
          <span className="text-white">{t.problem.headline}</span>
          <br />
          <span className="gradient-text">{t.problem.headlineBold}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/50 text-lg text-center max-w-2xl mx-auto mb-16"
        >
          {t.problem.subtext}
        </motion.p>

        {/* Comparison cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Old way */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-8 border border-red-500/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center">
                <X className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-white font-bold text-lg">
                {t.problem.card1Title}
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-red-300 font-semibold">{t.problem.card1Fee}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-red-300 font-semibold">{t.problem.card1Time}</span>
              </div>
              <div className="flex items-center gap-3">
                <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-red-300 font-semibold">{t.problem.card1Hidden}</span>
              </div>
            </div>
          </motion.div>

          {/* Malvik way */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass-blue rounded-2xl p-8 border border-blue-500/30 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(45,106,255,0.2) 0%, transparent 70%)" }} />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-white font-bold text-lg">{t.problem.card2Title}</h3>
            </div>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <DollarSign className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-green-400 font-semibold">{t.problem.card2Fee}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-green-400 font-semibold">{t.problem.card2Time}</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-green-400 font-semibold">{t.problem.card2Hidden}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
