"use client";

import { motion } from "framer-motion";
import PricingTable from "./PricingTable";
import { useI18n } from "@/lib/i18n";

export default function PricingPageContent() {
  const { locale } = useI18n();

  const consumerTiers = [
    {
      name: "Personal",
      price: "Free",
      description: "For individuals sending money globally.",
      features: [
        "0.3% per transaction",
        "Up to 50,000 NOK/month",
        "BankID verification",
        "USDC & EURC support",
        "Mobile-friendly dashboard",
        "Email support",
      ],
      cta: "Get started free",
      ctaHref: "#waitlist",
    },
    {
      name: "Premium",
      price: "99 NOK",
      period: "/month",
      description: "For power users and frequent senders.",
      features: [
        "0.15% per transaction",
        "Up to 500,000 NOK/month",
        "Priority settlement",
        "Multi-currency wallet",
        "Advanced analytics",
        "Priority support",
        "Scheduled payments",
      ],
      cta: "Start premium",
      ctaHref: "#waitlist",
      highlight: true,
      badge: "Most popular",
    },
  ];

  const businessTiers = [
    {
      name: "Startup",
      price: "299 NOK",
      period: "/month",
      description: "For small businesses and startups.",
      features: [
        "0.25% per transaction",
        "Up to 5M NOK/month",
        "API access",
        "Fiken integration",
        "3 team seats",
        "Email & chat support",
      ],
      cta: "Start free trial",
      ctaHref: "#waitlist",
    },
    {
      name: "Business",
      price: "999 NOK",
      period: "/month",
      description: "For growing businesses with high volumes.",
      features: [
        "0.15% per transaction",
        "Up to 50M NOK/month",
        "Full API suite + webhooks",
        "Fiken & Tripletex integration",
        "10 team seats",
        "Dedicated account manager",
        "Bulk payments",
        "Custom reporting",
      ],
      cta: "Start free trial",
      ctaHref: "#waitlist",
      highlight: true,
      badge: "Best value",
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organisations with complex needs.",
      features: [
        "Negotiated rates from 0.08%",
        "Unlimited volume",
        "White-label options",
        "Custom integrations",
        "Unlimited seats",
        "SLA with 99.9% uptime",
        "Dedicated infrastructure",
        "On-site onboarding",
      ],
      cta: "Contact sales",
      ctaHref: "mailto:enterprise@malvik.no",
    },
  ];

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

        {/* Consumer tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            {locale === "en" ? "Personal" : "Personlig"}
          </h2>
          <p className="text-white/40 text-sm mb-8">
            {locale === "en" ? "For individuals and freelancers" : "For privatpersoner og frilansere"}
          </p>
        </motion.div>
        <div className="max-w-3xl mb-20">
          <PricingTable tiers={consumerTiers} />
        </div>

        {/* Business tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            {locale === "en" ? "Business" : "Bedrift"}
          </h2>
          <p className="text-white/40 text-sm mb-8">
            {locale === "en" ? "For companies of all sizes" : "For bedrifter i alle størrelser"}
          </p>
        </motion.div>
        <PricingTable tiers={businessTiers} />

        {/* Fee comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 glass rounded-2xl p-8 sm:p-12 border border-white/10"
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
