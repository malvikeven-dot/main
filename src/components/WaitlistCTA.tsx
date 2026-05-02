"use client";

import { motion } from "framer-motion";
import WaitlistForm from "./WaitlistForm";
import { useI18n } from "@/lib/i18n";

export default function WaitlistCTA() {
  const { t } = useI18n();

  return (
    <section id="waitlist" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(45,106,255,0.12) 0%, transparent 70%)" }} />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-blue rounded-3xl p-10 sm:p-14 border border-blue-500/20 glow-blue"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
          >
            {t.cta.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg mb-10"
          >
            {t.cta.subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <WaitlistForm />
            <p className="text-white/30 text-sm mt-4">{t.cta.privacy}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
