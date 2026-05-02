"use client";

import { motion } from "framer-motion";
import { Check, ExternalLink, Code2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const integrations = ["Fiken", "Tripletex", "Xero", "QuickBooks"];

export default function B2BCallout() {
  const { t } = useI18n();

  const features = [
    t.b2b.feature1,
    t.b2b.feature2,
    t.b2b.feature3,
    t.b2b.feature4,
    t.b2b.feature5,
    t.b2b.feature6,
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
              {t.b2b.tag}
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 mb-6 leading-tight">
              {t.b2b.headline}
            </h2>
            <p className="text-white/50 text-lg mb-8 leading-relaxed">
              {t.b2b.subtext}
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-blue-400" />
                  </div>
                  <span className="text-white/70 text-sm">{f}</span>
                </li>
              ))}
            </ul>

            <motion.a
              href="#"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors"
            >
              {t.b2b.cta}
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </motion.div>

          {/* Right: code block / integrations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {/* Code snippet */}
            <div className="glass rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-4 h-4 text-blue-400" />
                <span className="text-white/40 text-xs font-mono">POST /v1/payments</span>
              </div>
              <pre className="text-sm font-mono text-white/70 overflow-x-auto">
                <span className="text-blue-300">{"{"}</span>{"\n"}
                {"  "}<span className="text-green-300">&quot;amount&quot;</span>
                <span className="text-white/40">: </span>
                <span className="text-yellow-300">1000</span>,{"\n"}
                {"  "}<span className="text-green-300">&quot;currency&quot;</span>
                <span className="text-white/40">: </span>
                <span className="text-yellow-300">&quot;USDC&quot;</span>,{"\n"}
                {"  "}<span className="text-green-300">&quot;destination&quot;</span>
                <span className="text-white/40">: </span>
                <span className="text-yellow-300">&quot;0xabc...&quot;</span>,{"\n"}
                {"  "}<span className="text-green-300">&quot;reference&quot;</span>
                <span className="text-white/40">: </span>
                <span className="text-yellow-300">&quot;INV-2024-001&quot;</span>{"\n"}
                <span className="text-blue-300">{"}"}</span>
              </pre>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-green-400 text-xs font-mono">200 OK — settled in 8.2s</span>
              </div>
            </div>

            {/* Integrations */}
            <div className="glass rounded-2xl p-6 border border-white/10">
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4">
                Native integrations
              </p>
              <div className="grid grid-cols-2 gap-3">
                {integrations.map((name) => (
                  <div
                    key={name}
                    className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-300">
                      {name[0]}
                    </div>
                    <span className="text-white/80 text-sm font-medium">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
