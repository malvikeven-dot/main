"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const partners = [
  { name: "USDC", detail: "by Circle" },
  { name: "EURC", detail: "by Circle" },
  { name: "Base", detail: "blockchain" },
  { name: "Circle", detail: "partner" },
  { name: "BankID", detail: "verified" },
  { name: "Finanstilsynet", detail: "regulated" },
];

export default function TrustBar() {
  const { t } = useI18n();

  return (
    <section className="py-12 border-y border-white/5 bg-navy-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10"
        >
          <p className="text-white/30 text-sm font-medium whitespace-nowrap">
            {t.trustBar.label}
          </p>
          <div className="w-px h-6 bg-white/10 hidden sm:block" />
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 sm:gap-10">
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-1.5 group"
              >
                <span className="text-white/80 font-bold text-sm group-hover:text-white transition-colors">
                  {p.name}
                </span>
                <span className="text-white/25 text-xs">{p.detail}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
