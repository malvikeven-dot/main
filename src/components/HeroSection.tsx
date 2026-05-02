"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid pt-20">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(45,106,255,0.25) 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(45,106,255,0.2) 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(123,159,255,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2 glass-blue rounded-full px-4 py-2 text-sm font-medium text-blue-300 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          {t.hero.badge}
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={0.15}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.05] tracking-tight mb-6"
        >
          <span className="text-white">{t.hero.headline}</span>
          <br />
          <span className="gradient-text">{t.hero.headlineBold}</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          custom={0.3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t.hero.subtext}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={0.45}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="#waitlist"
            className="group flex items-center gap-2 btn-primary text-base px-8 py-4"
          >
            {t.hero.cta1}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/products"
            className="group flex items-center gap-2 btn-secondary text-base px-8 py-4"
          >
            {t.hero.cta2}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white/60" />
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={0.6}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          {[
            { value: "0.3%", label: t.hero.stat1 },
            { value: "<10s", label: t.hero.stat2 },
            { value: "180+", label: t.hero.stat3 },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-4">
              <div className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-white/50 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Floating payment card illustration */}
        <motion.div
          custom={0.75}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative mt-20 max-w-2xl mx-auto"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="glass rounded-2xl p-6 sm:p-8 glow-blue"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-white/40 text-xs font-medium mb-1">Sending</p>
                <p className="text-white font-bold text-2xl">10,000 NOK</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-right">
                <p className="text-white/40 text-xs font-medium mb-1">Receiving</p>
                <p className="text-white font-bold text-2xl">887.40 USDC</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/40">Fee</span>
              <span className="text-green-400 font-semibold">0.30 USDC (0.3%)</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-white/40">Estimated time</span>
              <span className="text-white/80 font-medium">~8 seconds</span>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-sm font-medium">Live on Base Mainnet</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
