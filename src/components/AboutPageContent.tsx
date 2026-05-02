"use client";

import { motion } from "framer-motion";
import { MapPin, Target, Heart, Rocket } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: d } }),
};

const team = [
  {
    name: "Erik Malvik",
    role: "CEO & Co-founder",
    bio: "Former Vipps product lead. 10 years in Norwegian fintech.",
    avatar: "EM",
  },
  {
    name: "Ingrid Haugen",
    role: "CTO & Co-founder",
    bio: "Previously at Coinbase. Built payment infrastructure at scale.",
    avatar: "IH",
  },
  {
    name: "Lars Dahl",
    role: "Head of Compliance",
    bio: "Former Finanstilsynet regulator. Architect of our compliance framework.",
    avatar: "LD",
  },
  {
    name: "Mia Svensson",
    role: "Head of Design",
    bio: "Led design at DNB and Revolut Nordic. Obsessed with simplicity.",
    avatar: "MS",
  },
];

const values = [
  { icon: Target, title: "Radical transparency", desc: "Every fee visible. Every transaction on-chain. No surprises, ever." },
  { icon: Heart, title: "Nordic trust", desc: "Built on the same trust principles that made Norway a global model." },
  { icon: Rocket, title: "Speed first", desc: "Payments in seconds, not days. We believe waiting is a bug, not a feature." },
  { icon: MapPin, title: "Built in Norway", desc: "Proudly Norwegian. Regulated here. Designed for the Nordic market first." },
];

export default function AboutPageContent() {
  const { locale } = useI18n();
  const isEn = locale === "en";

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-24 max-w-3xl mx-auto"
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            {isEn ? "Our story" : "Vår historie"}
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mt-4 mb-6 leading-tight">
            {isEn ? "Built in Norway," : "Bygget i Norge,"}
            <br />
            <span className="gradient-text">
              {isEn ? "works everywhere." : "fungerer overalt."}
            </span>
          </h1>
          <p className="text-white/50 text-xl leading-relaxed">
            {isEn
              ? "We started Malvik because we were frustrated. International payments in 2024 still took days and cost a fortune. We knew stablecoins could fix that — so we built the infrastructure to make it happen."
              : "Vi startet Malvik fordi vi var frustrerte. Internasjonale betalinger i 2024 tok fortsatt dager og kostet en formue. Vi visste at stablecoins kunne fikse det — så vi bygde infrastrukturen for å få det til."}
          </p>
        </motion.div>

        {/* Mission block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-blue rounded-3xl p-10 sm:p-16 text-center mb-24 border border-blue-500/20"
        >
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">
            {isEn ? "Our mission" : "Vårt oppdrag"}
          </p>
          <blockquote className="text-3xl sm:text-4xl font-bold text-white leading-snug">
            {isEn
              ? "\"Make cross-border payments as fast, cheap, and simple as sending a text message.\""
              : "\"Gjøre grensekryssende betalinger like raske, billige og enkle som å sende en tekstmelding.\""}
          </blockquote>
        </motion.div>

        {/* Values */}
        <div className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-12"
          >
            {isEn ? "What we believe in" : "Hva vi tror på"}
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 border border-white/5 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-white font-bold mb-2">{v.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-12"
          >
            {isEn ? "The team" : "Teamet"}
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 border border-white/5 text-center group hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg glow-blue-sm">
                  {member.avatar}
                </div>
                <h3 className="text-white font-bold mb-1">{member.name}</h3>
                <p className="text-blue-400 text-xs font-semibold mb-3">{member.role}</p>
                <p className="text-white/40 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Company info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 border border-white/10 grid sm:grid-cols-3 gap-8 text-center"
        >
          {[
            { label: isEn ? "Founded" : "Grunnlagt", value: "2024" },
            { label: isEn ? "Headquarters" : "Hovedkontor", value: "Oslo, Norway" },
            { label: isEn ? "Regulated by" : "Regulert av", value: "Finanstilsynet" },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-2xl font-extrabold text-white mb-1">{item.value}</div>
              <div className="text-white/40 text-sm">{item.label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
