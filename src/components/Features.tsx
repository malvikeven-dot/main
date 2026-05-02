"use client";

import { motion } from "framer-motion";
import { Zap, Layers, MapPin } from "lucide-react";
import FeatureCard from "./FeatureCard";
import { useI18n } from "@/lib/i18n";

export default function Features() {
  const { t } = useI18n();

  const features = [
    {
      icon: Zap,
      title: t.features.f1Title,
      description: t.features.f1Desc,
    },
    {
      icon: Layers,
      title: t.features.f2Title,
      description: t.features.f2Desc,
    },
    {
      icon: MapPin,
      title: t.features.f3Title,
      description: t.features.f3Desc,
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            {t.features.tag}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-4"
        >
          {t.features.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/50 text-lg text-center max-w-2xl mx-auto mb-16"
        >
          {t.features.subtext}
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              description={f.description}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
