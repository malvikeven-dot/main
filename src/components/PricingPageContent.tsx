"use client";

import { motion } from "framer-motion";
import { PricingTable } from "@clerk/nextjs";
import { useI18n } from "@/lib/i18n";

export default function PricingPageContent() {
  const { locale } = useI18n();

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            {locale === "en" ? "Transparent pricing" : "Transparent priser"}
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mt-4 mb-6">
            {locale === "en" ? "Simple. Fair. Transparent." : "Enkel. Rettferdig. Transparent."}
          </h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            {locale === "en"
              ? "No monthly surprises. No hidden fees. Just 0.3% per transaction — ten times cheaper than your bank."
              : "Ingen månedlige overraskelser. Ingen skjulte gebyrer. Bare 0,3% per transaksjon — ti ganger billigere enn banken din."}
          </p>
        </motion.div>

        {/* Clerk PricingTable — renders plans configured in Clerk Dashboard → Billing → Subscription plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-20"
        >
          <PricingTable
            appearance={{
              variables: {
                colorBackground: "#0d1240",
                colorText: "#ffffff",
                colorPrimary: "#2d6aff",
                colorTextSecondary: "rgba(255,255,255,0.5)",
                colorNeutral: "rgba(255,255,255,0.12)",
                borderRadius: "1rem",
                fontFamily: "inherit",
              },
            }}
            checkoutProps={{
              appearance: {
                variables: {
                  colorBackground: "#0d1240",
                  colorText: "#ffffff",
                  colorPrimary: "#2d6aff",
                  borderRadius: "1rem",
                  fontFamily: "inherit",
                },
              },
            }}
          />
        </motion.div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 border border-white/10 text-center mb-20"
        >
          <h3 className="text-white font-bold text-xl mb-2">
            {locale === "en" ? "Need enterprise volume or custom integrations?" : "Trenger du stort volum eller egne integrasjoner?"}
          </h3>
          <p className="text-white/50 text-sm mb-6">
            {locale === "en"
              ? "Negotiated rates from 0.08%, white-label options, SLA, and dedicated infrastructure. Let's talk."
              : "Forhandlede satser fra 0,08 %, hvit-merke-løsninger, SLA og dedikert infrastruktur. La oss snakke."}
          </p>
          <a
            href="mailto:enterprise@malvik.no"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3"
          >
            {locale === "en" ? "Contact sales" : "Kontakt salg"}
          </a>
        </motion.div>

        {/* Fee comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 sm:p-12 border border-white/10"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-10">
            {locale === "en" ? "How we compare" : "Slik sammenligner vi oss"}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4 text-white/40 font-medium">Provider</th>
                  <th className="text-right py-3 px-4 text-white/40 font-medium">Fee</th>
                  <th className="text-right py-3 px-4 text-white/40 font-medium">Speed</th>
                  <th className="text-right py-3 pl-4 text-white/40 font-medium">Transparency</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Malvik", fee: "0.3%", speed: "<10s", transparent: "✓", highlight: true },
                  { name: "Traditional bank", fee: "2–5%", speed: "1–5 days", transparent: "✗", highlight: false },
                  { name: "Wise", fee: "0.5–1%", speed: "Minutes–hours", transparent: "~", highlight: false },
                  { name: "PayPal", fee: "3–4%", speed: "Instant–days", transparent: "✗", highlight: false },
                ].map((row) => (
                  <tr key={row.name} className={`border-b border-white/5 ${row.highlight ? "text-white" : "text-white/50"}`}>
                    <td className="py-3 pr-4 font-semibold flex items-center gap-2">
                      {row.name}
                      {row.highlight && (
                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-medium">Us</span>
                      )}
                    </td>
                    <td className={`text-right py-3 px-4 font-semibold ${row.highlight ? "text-green-400" : ""}`}>{row.fee}</td>
                    <td className={`text-right py-3 px-4 ${row.highlight ? "text-green-400 font-semibold" : ""}`}>{row.speed}</td>
                    <td className={`text-right py-3 pl-4 ${row.transparent === "✓" ? "text-green-400" : row.transparent === "✗" ? "text-red-400" : "text-yellow-400"}`}>
                      {row.transparent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
