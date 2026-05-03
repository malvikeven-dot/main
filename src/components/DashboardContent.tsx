"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, ArrowUpRight, ArrowDownLeft, Send, Plus, RefreshCw,
  TrendingUp, Eye, EyeOff, Clock, CheckCircle2, Copy, ExternalLink, X,
  Loader2, ArrowRight, ChevronDown, Globe
} from "lucide-react";
import Link from "next/link";

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_BALANCE = { noks: 12_450.00, usd_equiv: 1094.60 };

const MOCK_TXS = [
  { id: "tx1", type: "sent", label: "Invoice payment — Acme GmbH", amount: -2500.00, currency: "NOKS", to: "0x3f4...a8c", time: "2 min ago", status: "confirmed", flag: "🇩🇪" },
  { id: "tx2", type: "received", label: "Client payment — Bergström AB", amount: +8000.00, currency: "NOKS", from: "0x7b1...d2e", time: "1 hour ago", status: "confirmed", flag: "🇸🇪" },
  { id: "tx3", type: "sent", label: "Supplier — Manila Logistics", amount: -1250.00, currency: "NOKS", to: "0x9c2...f3d", time: "Yesterday", status: "confirmed", flag: "🇵🇭" },
  { id: "tx4", type: "received", label: "Top-up from DNB", amount: +5000.00, currency: "NOKS", from: "DNB Bank", time: "2 days ago", status: "confirmed", flag: "🇳🇴" },
  { id: "tx5", type: "sent", label: "Freelancer — Priya Sharma", amount: -900.00, currency: "NOKS", to: "0x2e8...b1a", time: "3 days ago", status: "confirmed", flag: "🇮🇳" },
  { id: "tx6", type: "sent", label: "Office supplies — Amazon DE", amount: -350.00, currency: "NOKS", to: "0x5a7...c4f", time: "5 days ago", status: "confirmed", flag: "🇩🇪" },
];

const QUICK_SEND = [
  { initials: "AG", name: "Acme GmbH", address: "0x3f4...a8c", flag: "🇩🇪" },
  { initials: "BS", name: "Bergström AB", address: "0x7b1...d2e", flag: "🇸🇪" },
  { initials: "PS", name: "Priya Sharma", address: "0x2e8...b1a", flag: "🇮🇳" },
];

const CURRENCIES = ["NOKS", "USDC", "EURC"];

// ─── Send Modal ───────────────────────────────────────────────────────────────

function SendModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"form" | "confirm" | "sending" | "done">("form");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("NOKS");
  const [note, setNote] = useState("");

  const canProceed = recipient.trim() && parseFloat(amount) > 0;

  const handleConfirm = async () => {
    setStep("sending");
    await new Promise((r) => setTimeout(r, 2000));
    setStep("done");
  };

  const inputCls = "w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,15,44,0.85)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass rounded-3xl p-6 sm:p-8 w-full max-w-md border border-white/15 relative"
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-bold text-white mb-6">Send NOKS</h2>

              {/* Quick send */}
              <div className="mb-5">
                <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">Recent</p>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {QUICK_SEND.map((c) => (
                    <button key={c.name} onClick={() => setRecipient(c.address)}
                      className={`flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl border transition-all flex-shrink-0 ${recipient === c.address ? "glass-blue border-blue-400/40" : "glass border-white/10 hover:border-white/20"}`}>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xs font-bold text-white">
                        {c.initials}
                      </div>
                      <span className="text-white/70 text-xs">{c.name.split(" ")[0]}</span>
                      <span className="text-white/30 text-xs">{c.flag}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient */}
              <div className="mb-4">
                <label className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2 block">To (address or name)</label>
                <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)}
                  placeholder="0x... or ENS name" className={inputCls} />
              </div>

              {/* Amount + currency */}
              <div className="mb-4">
                <label className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2 block">Amount</label>
                <div className="flex gap-2">
                  <input type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00" className={`${inputCls} flex-1`} />
                  <select value={currency} onChange={(e) => setCurrency(e.target.value)}
                    className="bg-white/5 border border-white/15 rounded-xl px-3 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer appearance-none">
                    {CURRENCIES.map((c) => (
                      <option key={c} value={c} style={{ background: "#0A0F2C" }}>{c}</option>
                    ))}
                  </select>
                </div>
                <p className="text-white/30 text-xs mt-1">Balance: {MOCK_BALANCE.noks.toLocaleString()} NOKS</p>
              </div>

              {/* Note */}
              <div className="mb-6">
                <label className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2 block">Note (optional)</label>
                <input type="text" value={note} onChange={(e) => setNote(e.target.value)}
                  placeholder="Invoice #, reference…" className={inputCls} />
              </div>

              <button onClick={() => setStep("confirm")} disabled={!canProceed}
                className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 disabled:opacity-40">
                Review payment <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-bold text-white mb-6">Confirm payment</h2>
              <div className="glass-blue rounded-2xl p-5 border border-blue-500/25 space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">To</span>
                  <span className="text-white font-mono text-xs">{recipient}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Amount</span>
                  <span className="text-white font-bold">{parseFloat(amount).toLocaleString()} {currency}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Network fee (0.3%)</span>
                  <span className="text-green-400">{(parseFloat(amount) * 0.003).toFixed(4)} {currency}</span>
                </div>
                {note && <div className="flex justify-between text-sm">
                  <span className="text-white/40">Note</span>
                  <span className="text-white/70">{note}</span>
                </div>}
                <div className="pt-2 border-t border-white/10 flex justify-between text-sm">
                  <span className="text-white/40">Total deducted</span>
                  <span className="text-white font-bold">{(parseFloat(amount) * 1.003).toFixed(2)} {currency}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-blue-300">~8 seconds on Base</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep("form")} className="flex-1 btn-secondary py-3 border border-white/15">Back</button>
                <button onClick={handleConfirm} className="flex-1 btn-primary py-3 flex items-center justify-center gap-2">
                  Confirm & send <Zap className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === "sending" && (
            <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-8">
              <div className="w-16 h-16 rounded-full glass-blue border border-blue-400/30 flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-7 h-7 text-blue-400 animate-spin" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Broadcasting transaction…</h3>
              <p className="text-white/40 text-sm">Minting NOKS and settling on Base</p>
            </motion.div>
          )}

          {step === "done" && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Payment sent!</h3>
              <p className="text-white/50 text-sm mb-6">
                {parseFloat(amount).toLocaleString()} {currency} delivered in ~8 seconds.
              </p>
              <div className="glass rounded-xl p-3 text-left text-xs font-mono text-white/40 mb-6 flex items-center justify-between">
                <span>0x7f3a...4e9c1d</span>
                <div className="flex gap-2">
                  <Copy className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
                  <ExternalLink className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>
              <button onClick={onClose} className="w-full btn-primary py-3">Done</button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function DashboardContent() {
  const [showBalance, setShowBalance] = useState(true);
  const [sendOpen, setSendOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {sendOpen && <SendModal onClose={() => setSendOpen(false)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-navy-900 bg-grid">
        {/* Top bar */}
        <div className="glass border-b border-white/5 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center glow-blue-sm">
              <Zap className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <span className="font-bold text-white">Malvik</span>
            <span className="hidden sm:inline text-white/20 text-sm ml-1">/ Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 glass rounded-full px-3 py-1.5 border border-white/10">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xs font-bold text-white">K</div>
              <span className="text-white/70 text-xs font-medium hidden sm:inline">Kari N.</span>
            </div>
            <Link href="/" className="text-white/40 hover:text-white text-xs transition-colors">← Site</Link>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

          {/* Balance card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-blue rounded-3xl p-6 sm:p-8 border border-blue-400/25 relative overflow-hidden glow-blue"
          >
            {/* BG blob */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(45,106,255,0.2) 0%, transparent 70%)" }} />

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">Total balance</p>
                  <div className="flex items-end gap-3">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
                      {showBalance ? MOCK_BALANCE.noks.toLocaleString("en-US", { minimumFractionDigits: 2 }) : "••••••"}
                    </h1>
                    <span className="text-blue-400 font-bold text-xl mb-1">NOKS</span>
                  </div>
                  <p className="text-white/30 text-sm mt-1">
                    ≈ ${showBalance ? MOCK_BALANCE.usd_equiv.toLocaleString() : "••••"} USD
                  </p>
                </div>
                <button onClick={() => setShowBalance(!showBalance)}
                  className="text-white/30 hover:text-white transition-colors p-2 glass rounded-xl border border-white/10">
                  {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setSendOpen(true)}
                  className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm">
                  <Send className="w-4 h-4" /> Send
                </button>
                <button className="btn-secondary flex items-center gap-2 px-5 py-2.5 text-sm border border-white/15">
                  <Plus className="w-4 h-4" /> Add funds
                </button>
                <button className="btn-secondary flex items-center gap-2 px-5 py-2.5 text-sm border border-white/15">
                  <RefreshCw className="w-4 h-4" /> Convert
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="grid grid-cols-3 gap-4"
          >
            {[
              { label: "Sent this month", value: "kr 5,000", sub: "3 transactions", icon: ArrowUpRight, color: "text-red-400" },
              { label: "Received", value: "kr 13,000", sub: "2 transactions", icon: ArrowDownLeft, color: "text-green-400" },
              { label: "Avg. fee paid", value: "0.3%", sub: "vs 3.5% bank avg", icon: TrendingUp, color: "text-blue-400" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl p-4 sm:p-5 border border-white/5">
                <s.icon className={`w-4 h-4 ${s.color} mb-3`} />
                <p className="text-white font-bold text-lg sm:text-xl">{s.value}</p>
                <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
                <p className="text-white/25 text-xs">{s.sub}</p>
              </div>
            ))}
          </motion.div>

          {/* Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="glass rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <h2 className="text-white font-bold">Recent transactions</h2>
              <button className="text-blue-400 text-xs font-semibold hover:text-blue-300 transition-colors flex items-center gap-1">
                View all <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="divide-y divide-white/5">
              {MOCK_TXS.map((tx, i) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-white/3 transition-colors group"
                >
                  {/* Icon */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${tx.type === "sent" ? "bg-red-500/10" : "bg-green-500/10"}`}>
                    {tx.type === "sent"
                      ? <ArrowUpRight className="w-4 h-4 text-red-400" />
                      : <ArrowDownLeft className="w-4 h-4 text-green-400" />}
                  </div>

                  {/* Label */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{tx.flag} {tx.label}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-white/30 text-xs">{tx.time}</span>
                      <span className="flex items-center gap-1 text-green-400/60 text-xs">
                        <CheckCircle2 className="w-3 h-3" /> confirmed
                      </span>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-right flex-shrink-0">
                    <p className={`font-bold text-sm ${tx.amount < 0 ? "text-red-400" : "text-green-400"}`}>
                      {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-white/30 text-xs">{tx.currency}</p>
                  </div>

                  <ExternalLink className="w-3.5 h-3.5 text-white/15 group-hover:text-white/40 transition-colors flex-shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Proto banner */}
          <div className="flex items-center gap-3 glass rounded-2xl px-5 py-3.5 border border-yellow-500/20 text-sm">
            <Globe className="w-4 h-4 text-yellow-400 flex-shrink-0" />
            <p className="text-white/50">
              <span className="text-yellow-400 font-semibold">Prototype mode</span> — data is simulated. No real transactions are processed.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
