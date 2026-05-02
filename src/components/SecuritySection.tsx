"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Building2, Coins, Eye } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function SecuritySection() {
  const { t } = useI18n();

  const pillars = [
    {
      icon: ShieldCheck,
      title: t.security.s1Title,
      desc: t.security.s1Desc,
    },
    {
      icon: Building2,
      title: t.security.s2Title,
      desc: t.security.s2Desc,
    },
    {
      icon: Coins,
      title: t.security.s3Title,
      desc: t.security.s3Desc,
    },
    {
      icon: Eye,
      title: t.security.s4Title,
      desc: t.security.s4Desc,
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Deep navy BG with slight gradient */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(10,15,44,0.8) 50%, transparent 100%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            {t.security.tag}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-4"
        >
          {t.security.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/50 text-lg text-center max-w-2xl mx-auto mb-16"
        >
          {t.security.subtext}
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 text-center border border-white/5 hover:border-blue-500/25 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 group-hover:bg-blue-500/20 flex items-center justify-center mx-auto mb-5 transition-all duration-300">
                <p.icon className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-white font-bold mb-2">{p.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
