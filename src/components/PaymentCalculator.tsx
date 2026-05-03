"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Clock, TrendingDown, Info } from "lucide-react";
import { useI18n } from "@/lib/i18n";

// Approximate FX rates to NOK (1 NOK = X foreign)
const COUNTRIES = [
  { code: "US", flag: "🇺🇸", name: "United States", currency: "USD", rate: 0.088 },
  { code: "DE", flag: "🇩🇪", name: "Germany", currency: "EUR", rate: 0.082 },
  { code: "GB", flag: "🇬🇧", name: "United Kingdom", currency: "GBP", rate: 0.070 },
  { code: "SE", flag: "🇸🇪", name: "Sweden", currency: "SEK", rate: 0.97 },
  { code: "NG", flag: "🇳🇬", name: "Nigeria", currency: "NGN", rate: 140.0 },
  { code: "IN", flag: "🇮🇳", name: "India", currency: "INR", rate: 7.3 },
  { code: "PL", flag: "🇵🇱", name: "Poland", currency: "PLN", rate: 0.40 },
  { code: "JP", flag: "🇯🇵", name: "Japan", currency: "JPY", rate: 13.5 },
  { code: "BR", flag: "🇧🇷", name: "Brazil", currency: "BRL", rate: 0.49 },
  { code: "PH", flag: "🇵🇭", name: "Philippines", currency: "PHP", rate: 5.1 },
];

// NOKS is 1:1 with NOK (Norwegian Krone Stablecoin)
const MALVIK_FEE = 0.003; // 0.3%
const BANK_FEE = 0.035;   // 3.5%
const BANK_FX_MARKUP = 0.02; // additional 2% FX markup

const BANK_TIMES = ["1–3 days", "2–5 days", "3–5 days", "1–2 days", "3–7 days", "2–4 days", "1–3 days", "3–5 days", "4–7 days", "3–5 days"];

function fmt(n: number, decimals = 2) {
  return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export default function PaymentCalculator() {
  const { locale } = useI18n();
  const isEn = locale === "en";

  const [nokAmount, setNokAmount] = useState("10000");
  const [countryIdx, setCountryIdx] = useState(0);

  const amount = Math.max(0, parseFloat(nokAmount.replace(/,/g, "")) || 0);
  const country = COUNTRIES[countryIdx];

  const calc = useMemo(() => {
    const malvikFee = amount * MALVIK_FEE;
    const malvikNet = amount - malvikFee;
    const malvikReceived = malvikNet * country.rate;
    const noksAmount = amount; // 1 NOK = 1 NOKS

    const bankFee = amount * BANK_FEE;
    const bankFxLoss = amount * BANK_FX_MARKUP;
    const bankNet = amount - bankFee - bankFxLoss;
    const bankReceived = bankNet * country.rate;
    const bankTotalCost = bankFee + bankFxLoss;

    const savings = bankTotalCost - malvikFee;
    const savingsPct = ((savings / bankTotalCost) * 100).toFixed(0);

    return { malvikFee, malvikNet, malvikReceived, noksAmount, bankFee, bankFxLoss, bankNet, bankReceived, bankTotalCost, savings, savingsPct };
  }, [amount, country]);

  const bankTimeIdx = countryIdx < BANK_TIMES.length ? countryIdx : 0;

  return (
    <div className="glass rounded-3xl p-6 sm:p-8 border border-white/10 max-w-3xl mx-auto">
      <div className="mb-6">
        <h3 className="text-white font-bold text-xl mb-1">
          {isEn ? "Live payment simulator" : "Live betalingssimulator"}
        </h3>
        <p className="text-white/40 text-sm">
          {isEn ? "See exactly what you save vs. a traditional bank wire." : "Se nøyaktig hva du sparer vs. bankoverføring."}
        </p>
      </div>

      {/* Inputs row */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {/* Amount */}
        <div>
          <label className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2 block">
            {isEn ? "You send (NOK)" : "Du sender (NOK)"}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm font-medium">kr</span>
            <input
              type="number"
              min="0"
              value={nokAmount}
              onChange={(e) => setNokAmount(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-white text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
          </div>
          {/* Presets */}
          <div className="flex gap-2 mt-2">
            {["1000", "10000", "50000", "100000"].map((v) => (
              <button key={v} onClick={() => setNokAmount(v)}
                className={`text-xs px-2 py-1 rounded-lg border transition-all ${nokAmount === v ? "bg-blue-500/20 border-blue-400/40 text-blue-300" : "border-white/10 text-white/40 hover:text-white/70 hover:border-white/20"}`}>
                {parseInt(v) >= 1000 ? `${parseInt(v) / 1000}k` : v}
              </button>
            ))}
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2 block">
            {isEn ? "Destination country" : "Destinasjonsland"}
          </label>
          <select
            value={countryIdx}
            onChange={(e) => setCountryIdx(parseInt(e.target.value))}
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
          >
            {COUNTRIES.map((c, i) => (
              <option key={c.code} value={i} style={{ background: "#0A0F2C" }}>
                {c.flag} {c.name} ({c.currency})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results side by side */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${amount}-${countryIdx}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid sm:grid-cols-2 gap-4 mb-5"
        >
          {/* Malvik */}
          <div className="glass-blue rounded-2xl p-5 border border-blue-400/30 relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full font-semibold">Malvik</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                {isEn ? "via NOKS stablecoin" : "via NOKS stablecoin"}
              </span>
            </div>

            <div className="mb-3">
              <p className="text-white/40 text-xs mb-0.5">{isEn ? "NOKS minted" : "NOKS laget"}</p>
              <p className="text-white font-extrabold text-2xl">{fmt(calc.noksAmount, 0)} <span className="text-blue-400 text-base font-bold">NOKS</span></p>
            </div>

            <div className="mb-3">
              <p className="text-white/40 text-xs mb-0.5">{country.flag} {isEn ? "Recipient gets" : "Mottaker får"}</p>
              <p className="text-white font-bold text-xl">{fmt(calc.malvikReceived)} <span className="text-white/60 text-sm">{country.currency}</span></p>
            </div>

            <div className="space-y-1.5 pt-3 border-t border-white/10">
              <div className="flex justify-between text-sm">
                <span className="text-white/40">{isEn ? "Fee (0.3%)" : "Gebyr (0,3%)"}</span>
                <span className="text-green-400 font-semibold">kr {fmt(calc.malvikFee)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">{isEn ? "FX markup" : "Valutapåslag"}</span>
                <span className="text-green-400 font-semibold">kr 0.00</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm pt-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-blue-300 font-semibold">~8 seconds</span>
              </div>
            </div>
          </div>

          {/* Bank */}
          <div className="glass rounded-2xl p-5 border border-red-500/20 relative">
            <div className="absolute top-3 right-3">
              <span className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full font-semibold">
                {isEn ? "Traditional bank" : "Tradisjonell bank"}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-red-400" />
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                {isEn ? "wire transfer" : "bankoverføring"}
              </span>
            </div>

            <div className="mb-3">
              <p className="text-white/40 text-xs mb-0.5">{isEn ? "Amount sent" : "Beløp sendt"}</p>
              <p className="text-white font-extrabold text-2xl">{fmt(amount, 0)} <span className="text-white/40 text-base font-bold">NOK</span></p>
            </div>

            <div className="mb-3">
              <p className="text-white/40 text-xs mb-0.5">{country.flag} {isEn ? "Recipient gets" : "Mottaker får"}</p>
              <p className="text-white/70 font-bold text-xl">{fmt(calc.bankReceived)} <span className="text-white/40 text-sm">{country.currency}</span></p>
            </div>

            <div className="space-y-1.5 pt-3 border-t border-white/10">
              <div className="flex justify-between text-sm">
                <span className="text-white/40">{isEn ? "Fee (3.5%)" : "Gebyr (3,5%)"}</span>
                <span className="text-red-400 font-semibold">kr {fmt(calc.bankFee)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">{isEn ? "FX markup (2%)" : "Valutapåslag (2%)"}</span>
                <span className="text-red-400 font-semibold">kr {fmt(calc.bankFxLoss)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm pt-1">
                <Clock className="w-3.5 h-3.5 text-red-400" />
                <span className="text-red-300 font-semibold">{BANK_TIMES[bankTimeIdx]}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Savings banner */}
      {amount > 0 && (
        <motion.div
          key={`savings-${amount}-${countryIdx}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-green-500/10 border border-green-500/25 rounded-2xl px-5 py-4"
        >
          <div className="flex items-center gap-3">
            <TrendingDown className="w-5 h-5 text-green-400 flex-shrink-0" />
            <div>
              <p className="text-green-400 font-bold text-sm">
                {isEn
                  ? `You save kr ${fmt(calc.savings)} (${calc.savingsPct}% less fees)`
                  : `Du sparer kr ${fmt(calc.savings)} (${calc.savingsPct}% lavere gebyrer)`}
              </p>
              <p className="text-white/40 text-xs">
                {isEn
                  ? `Recipient gets ${fmt(calc.malvikReceived - calc.bankReceived)} more ${country.currency}`
                  : `Mottaker får ${fmt(calc.malvikReceived - calc.bankReceived)} mer ${country.currency}`}
              </p>
            </div>
          </div>
          <a href="/waitlist"
            className="flex items-center gap-1.5 btn-primary text-sm px-5 py-2.5 whitespace-nowrap">
            {isEn ? "Get started" : "Kom i gang"}
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      )}

      {/* Disclaimer */}
      <div className="flex items-start gap-2 mt-4">
        <Info className="w-3.5 h-3.5 text-white/20 flex-shrink-0 mt-0.5" />
        <p className="text-white/20 text-xs">
          {isEn
            ? "Illustrative rates only. NOKS is a 1:1 NOK-backed stablecoin. FX rates are approximate. Bank fees vary by provider."
            : "Kun illustrative kurser. NOKS er en 1:1 NOK-støttet stablecoin. Valutakurser er omtrentlige. Bankgebyrer varierer."}
        </p>
      </div>
    </div>
  );
}
