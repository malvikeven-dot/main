"use client";

import { motion } from "framer-motion";
import { Zap, Globe, Building2, Code2, ShieldCheck, Repeat, BarChart3, Users } from "lucide-react";
import FeatureCard from "./FeatureCard";
import PaymentCalculator from "./PaymentCalculator";
import { useI18n } from "@/lib/i18n";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: d } }),
};

export default function ProductsPageContent() {
  const { locale } = useI18n();
  const isEn = locale === "en";

  const consumerFeatures = [
    { icon: Zap, title: isEn ? "Instant payments" : "Øyeblikkelige betalinger", description: isEn ? "Send to any wallet globally in under 10 seconds. 24/7, no downtime." : "Send til ethvert lommebok globalt på under 10 sekunder. 24/7, ingen nedetid." },
    { icon: Globe, title: isEn ? "Global reach" : "Global rekkevidde", description: isEn ? "Send to 180+ countries. No restrictions, no blacklists." : "Send til 180+ land. Ingen begrensninger, ingen svartelister." },
    { icon: ShieldCheck, title: isEn ? "BankID secure" : "BankID sikker", description: isEn ? "Instant KYC with Norwegian BankID. No forms, no waiting." : "Øyeblikkelig KYC med norsk BankID. Ingen skjemaer, ingen venting." },
  ];

  const businessFeatures = [
    { icon: Code2, title: isEn ? "Developer API" : "Utvikler-API", description: isEn ? "Full REST API with webhooks. Integrate in hours, not weeks." : "Full REST API med webhooks. Integrer på timer, ikke uker." },
    { icon: Repeat, title: isEn ? "Accounting sync" : "Regnskapssynk", description: isEn ? "Native Fiken & Tripletex integrations. Auto-reconciliation." : "Native Fiken & Tripletex-integrasjoner. Automatisk avstemming." },
    { icon: BarChart3, title: isEn ? "Analytics dashboard" : "Analysedashboard", description: isEn ? "Real-time transaction data, volume reports, and FX exposure." : "Sanntids transaksjonsdata, volumrapporter og valutaeksponering." },
    { icon: Users, title: isEn ? "Team access" : "Teamtilgang", description: isEn ? "Multi-user accounts with role-based permissions and audit logs." : "Flerbrukerkontoer med rollebaserte tillatelser og revisjonslogger." },
    { icon: Building2, title: isEn ? "Corporate accounts" : "Bedriftskontoer", description: isEn ? "Separate corporate wallets, bulk payments, and invoice management." : "Separate bedriftslommebøker, massebetalinger og fakturabehandling." },
    { icon: Globe, title: isEn ? "Multi-currency" : "Flervalguta", description: isEn ? "Manage NOK, USDC and EURC balances in one unified dashboard." : "Administrer NOK, USDC og EURC-saldoer i ett samlet dashboard." },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-20"
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            {isEn ? "The platform" : "Plattformen"}
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mt-4 mb-6 leading-tight">
            {isEn ? "Two products." : "To produkter."}
            <br />
            <span className="gradient-text">
              {isEn ? "One mission." : "Ett oppdrag."}
            </span>
          </h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            {isEn
              ? "Whether you're sending money home or processing B2B invoices, Malvik gives you the fastest, cheapest rails on the planet."
              : "Enten du sender penger hjem eller behandler B2B-fakturaer, gir Malvik deg de raskeste og billigste rails på planeten."}
          </p>
        </motion.div>

        {/* Consumer product */}
        <section className="mb-28">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-2 glass-blue px-4 py-2 rounded-full border border-blue-500/30 mb-4">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">
                {isEn ? "Consumer" : "Forbruker"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              {isEn ? "Malvik Personal" : "Malvik Personlig"}
            </h2>
            <p className="text-white/50 text-lg max-w-xl">
              {isEn
                ? "A stablecoin wallet built for everyday Norwegians. Send money globally with BankID simplicity."
                : "En stablecoin-lommebok bygget for vanlige nordmenn. Send penger globalt med BankID-enkelhet."}
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {consumerFeatures.map((f, i) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} index={i} />
            ))}
          </div>
        </section>

        {/* B2B product */}
        <section id="business">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-2 glass-blue px-4 py-2 rounded-full border border-blue-500/30 mb-4">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">
                {isEn ? "Business" : "Bedrift"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Malvik Business
            </h2>
            <p className="text-white/50 text-lg max-w-xl">
              {isEn
                ? "The complete stablecoin payment infrastructure for Norwegian companies. API-first, compliance-ready."
                : "Den komplette stablecoin betalingsinfrastrukturen for norske bedrifter. API-først, compliance-klar."}
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessFeatures.map((f, i) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} index={i} />
            ))}
          </div>
        </section>

        {/* Payment Calculator */}
        <section className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
              {isEn ? "See it in action" : "Se det i praksis"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
              {isEn ? "Calculate your savings" : "Beregn besparelsene dine"}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <PaymentCalculator />
          </motion.div>
        </section>

        {/* API section */}
        <section id="api" className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-10 sm:p-14 border border-white/10"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">API</span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">
                  {isEn ? "Integrate in minutes" : "Integrer på minutter"}
                </h3>
                <p className="text-white/50 mb-6">
                  {isEn
                    ? "Our REST API is designed to get you from zero to live payments in an afternoon. Full TypeScript SDK, webhooks, and sandboxed testing included."
                    : "Vår REST API er designet for å få deg fra null til live betalinger på en ettermiddag. Full TypeScript SDK, webhooks og sandkassetesting inkludert."}
                </p>
                <ul className="space-y-2 text-white/60 text-sm">
                  {(isEn
                    ? ["TypeScript & Python SDKs", "Sandbox environment", "Webhook signatures", "Idempotency keys", "OpenAPI spec"]
                    : ["TypeScript & Python SDK-er", "Sandkassemiljø", "Webhook-signaturer", "Idempotens-nøkler", "OpenAPI-spec"]
                  ).map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-blue rounded-2xl p-6 font-mono text-sm border border-blue-500/20">
                <div className="text-white/30 text-xs mb-4">// Install SDK</div>
                <div className="text-green-300 mb-4">npm install @malvik/sdk</div>
                <div className="text-white/30 text-xs mb-2">// Send payment</div>
                <div className="text-blue-300">
                  <span className="text-purple-300">import</span>
                  {" { Malvik } "}
                  <span className="text-purple-300">from</span>
                  {" '"}
                  <span className="text-yellow-300">@malvik/sdk</span>
                  {"';"}{"\n\n"}
                </div>
                <div className="text-white/70">
                  <span className="text-purple-300">const</span>
                  {" malvik = "}
                  <span className="text-purple-300">new</span>
                  {" Malvik(apiKey);"}
                  {"\n\n"}
                  <span className="text-purple-300">await</span>
                  {" malvik.payments."}
                  <span className="text-yellow-300">send</span>
                  {"({"}{"\n"}
                  {"  amount: "}
                  <span className="text-yellow-300">1000</span>
                  {",\n"}
                  {"  currency: "}
                  <span className="text-green-300">&quot;USDC&quot;</span>
                  {",\n"}
                  {"  to: "}
                  <span className="text-green-300">&quot;0x...&quot;</span>
                  {",\n"}
                  {"});"}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
