"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, ArrowUpRight, ArrowDownLeft, Send, Plus, RefreshCw,
  TrendingUp, Eye, EyeOff, Clock, CheckCircle2, Copy, ExternalLink, X,
  Loader2, ArrowRight, ChevronDown, Globe, AlertTriangle, Wallet, CreditCard
} from "lucide-react";
import Link from "next/link";
import { useSubscription } from "@clerk/nextjs/experimental";
import { useUser, UserButton } from "@clerk/nextjs";
import {
  useAccount, useBalance, useSendTransaction, useChainId, useWaitForTransactionReceipt
} from "wagmi";
import { parseEther, isAddress } from "viem";
import { baseSepolia } from "@/lib/wagmi";
import { ConnectButton } from "./WalletConnect";

// ─── Data ─────────────────────────────────────────────────────────────────────

const MOCK_BALANCE_NOKS = 12_450.00;

type Tx = {
  id: string;
  type: "sent" | "received";
  label: string;
  amount: number;
  currency: string;
  flag: string;
  created_at: string;
};

function useDashboard() {
  const [transactions, setTransactions] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profile")
      .then(() => fetch("/api/transactions"))
      .then((r) => r.json())
      .then(({ transactions }) => setTransactions(transactions ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { transactions, loading };
}

function truncate(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function fmt(n: number, d = 2) {
  return n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
}

// ─── Send Modal ───────────────────────────────────────────────────────────────

function SendModal({ onClose }: { onClose: () => void }) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const onCorrectChain = chainId === baseSepolia.id;

  const [step, setStep] = useState<"form" | "confirm" | "sending" | "done">("form");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount]       = useState("");
  const [note, setNote]           = useState("");
  const [txHash, setTxHash]       = useState<`0x${string}` | undefined>();
  const [mockMode, setMockMode]   = useState(false);

  const { sendTransaction, isPending: isSending } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txHash });

  const validRecipient = recipient.trim().length > 0 && (isAddress(recipient) || !isConnected);
  const validAmount = parseFloat(amount) > 0;
  const canProceed = validRecipient && validAmount;

  const handleSend = () => {
    if (!isConnected || !onCorrectChain || mockMode) {
      // mock flow
      setStep("sending");
      setTimeout(() => { setStep("done"); }, 2000);
      return;
    }
    setStep("sending");
    sendTransaction(
      { to: recipient as `0x${string}`, value: parseEther(amount) },
      {
        onSuccess: (hash) => { setTxHash(hash); setStep("done"); },
        onError: () => setStep("confirm"),
      }
    );
  };

  const inputCls = "w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,15,44,0.88)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass rounded-3xl p-6 sm:p-8 w-full max-w-md border border-white/15 relative"
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-bold text-white mb-1">Send ETH</h2>
              <p className="text-white/40 text-xs mb-5">
                {isConnected && onCorrectChain
                  ? <>Live on <span className="text-blue-400">Base Sepolia</span> testnet</>
                  : <span className="text-yellow-400">Wallet not connected — using mock mode</span>}
              </p>

              {/* Wallet not connected warning */}
              {!isConnected && (
                <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/25 rounded-xl p-3 mb-5 text-sm">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-yellow-300/80 text-xs">
                    Connect your wallet to send a real on-chain transaction. This will run as a mock demo.
                  </p>
                </div>
              )}

              {/* Wrong chain warning */}
              {isConnected && !onCorrectChain && (
                <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/25 rounded-xl p-3 mb-5 text-sm">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-yellow-300/80 text-xs">
                    Switch to Base Sepolia in your wallet to send a real transaction.
                  </p>
                </div>
              )}

              <div className="mb-4">
                <label className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2 block">
                  To {isConnected ? "(wallet address)" : "(address or name)"}
                </label>
                <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)}
                  placeholder="0x..." className={inputCls} />
                {recipient && isConnected && !isAddress(recipient) && (
                  <p className="text-red-400 text-xs mt-1">Invalid Ethereum address</p>
                )}
              </div>

              <div className="mb-4">
                <label className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2 block">
                  Amount (ETH)
                </label>
                <input type="number" min="0" step="0.001" value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.001" className={inputCls} />
                {isConnected && <LiveBalance address={address} />}
              </div>

              <div className="mb-6">
                <label className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2 block">
                  Note (optional)
                </label>
                <input type="text" value={note} onChange={(e) => setNote(e.target.value)}
                  placeholder="Invoice #, reference…" className={inputCls} />
              </div>

              <button onClick={() => setStep("confirm")} disabled={!canProceed}
                className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 disabled:opacity-40">
                Review <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-bold text-white mb-6">Confirm transaction</h2>
              <div className="glass-blue rounded-2xl p-5 border border-blue-500/25 space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">To</span>
                  <span className="text-white font-mono text-xs">{truncate(recipient)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Amount</span>
                  <span className="text-white font-bold">{amount} ETH</span>
                </div>
                {note && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Note</span>
                    <span className="text-white/70">{note}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm pt-1 border-t border-white/10">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-blue-300">~2 seconds on Base Sepolia</span>
                </div>
                <div className="text-xs text-white/30">
                  Network: Base Sepolia testnet (no real value)
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep("form")} className="flex-1 btn-secondary py-3 border border-white/15">Back</button>
                <button onClick={handleSend} disabled={isSending}
                  className="flex-1 btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-60">
                  {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Send</>}
                </button>
              </div>
            </motion.div>
          )}

          {(step === "sending" || isConfirming) && (
            <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-8">
              <div className="w-16 h-16 rounded-full glass-blue border border-blue-400/30 flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-7 h-7 text-blue-400 animate-spin" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                {txHash ? "Waiting for confirmation…" : "Broadcasting transaction…"}
              </h3>
              <p className="text-white/40 text-sm">Settling on Base Sepolia</p>
            </motion.div>
          )}

          {step === "done" && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">
                {txHash ? "Transaction confirmed!" : "Payment sent (mock)!"}
              </h3>
              <p className="text-white/50 text-sm mb-5">
                {amount} ETH sent{txHash ? " on Base Sepolia" : " (simulated)"}.
              </p>

              {txHash && (
                <div className="glass rounded-xl p-3 text-left text-xs font-mono text-white/50 mb-5 flex items-center justify-between">
                  <span className="truncate mr-2">{txHash}</span>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => navigator.clipboard.writeText(txHash)}>
                      <Copy className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
                    </button>
                    <a href={`https://sepolia.basescan.org/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
                    </a>
                  </div>
                </div>
              )}

              {txHash && (
                <a href={`https://sepolia.basescan.org/tx/${txHash}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 text-blue-400 text-sm hover:text-blue-300 transition-colors mb-5">
                  View on BaseScan <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <button onClick={onClose} className="w-full btn-primary py-3">Done</button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ─── Live balance subcomponent ────────────────────────────────────────────────

function LiveBalance({ address }: { address?: `0x${string}` }) {
  const { data, isLoading } = useBalance({ address, chainId: baseSepolia.id });
  if (!address) return null;
  return (
    <p className="text-white/30 text-xs mt-1">
      Balance:{" "}
      {isLoading ? "loading…" : data ? `${parseFloat(data.formatted).toFixed(4)} ${data.symbol}` : "—"}
    </p>
  );
}

// ─── Live wallet card ─────────────────────────────────────────────────────────

function LiveWalletCard() {
  const { address, isConnected } = useAccount();
  const { data: balance, isLoading } = useBalance({ address, chainId: baseSepolia.id });
  const chainId = useChainId();
  const onCorrectChain = chainId === baseSepolia.id;

  if (!isConnected) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="glass rounded-2xl border border-white/10 p-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
          <Wallet className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="text-white font-semibold mb-1">Connect your wallet</p>
          <p className="text-white/40 text-sm">
            Link a real wallet to see your live Base Sepolia ETH balance and send on-chain transactions.
          </p>
        </div>
        <ConnectButton />
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
      className="glass rounded-2xl border border-blue-500/25 p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Live wallet</span>
          {!onCorrectChain && (
            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">Wrong network</span>
          )}
        </div>
        <ConnectButton />
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-white/40 text-xs mb-0.5">Address</p>
          <p className="text-white font-mono text-sm">{truncate(address!)}</p>
        </div>
        <div className="text-right">
          <p className="text-white/40 text-xs mb-0.5">ETH balance</p>
          <p className="text-white font-bold text-lg">
            {isLoading ? (
              <span className="text-white/30 text-sm">loading…</span>
            ) : balance ? (
              <>{parseFloat(balance.formatted).toFixed(4)} <span className="text-blue-400 text-sm">ETH</span></>
            ) : "—"}
          </p>
        </div>
      </div>

      {onCorrectChain && (
        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-white/30">
          <span>Base Sepolia testnet</span>
          <a href="https://www.alchemy.com/faucets/base-sepolia" target="_blank" rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
            Get test ETH <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </motion.div>
  );
}

// ─── Main dashboard ───────────────────────────────────────────────────────────

export default function DashboardContent() {
  const [showBalance, setShowBalance] = useState(true);
  const [sendOpen, setSendOpen] = useState(false);
  const { user } = useUser();
  const { transactions, loading } = useDashboard();
  const { data: subscription, isLoading: subLoading } = useSubscription();

  const activePaidItem = subscription?.subscriptionItems?.find(
    (item) => item.plan.hasBaseFee && item.status === "active"
  );
  const planName = activePaidItem?.plan?.name ?? "Free";

  const greeting = user?.firstName
    ? `Good morning, ${user.firstName}`
    : user?.primaryEmailAddress?.emailAddress
    ? `Good morning, ${user.primaryEmailAddress.emailAddress.split("@")[0]}`
    : "Dashboard";

  return (
    <>
      <AnimatePresence>{sendOpen && <SendModal onClose={() => setSendOpen(false)} />}</AnimatePresence>

      <div className="min-h-screen bg-navy-900 bg-grid">
        {/* Top bar */}
        <div className="glass border-b border-white/5 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center glow-blue-sm">
              <Zap className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <span className="font-bold text-white">Malvik</span>
            <span className="hidden sm:inline text-white/20 text-sm ml-1">/ Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <ConnectButton />
            <Link href="/" className="text-white/40 hover:text-white text-xs transition-colors hidden sm:inline">← Site</Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 rounded-xl",
                  userButtonTrigger: "focus:ring-0 focus:ring-offset-0",
                },
              }}
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">

          {/* Page header */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-bold text-white">{greeting}</h1>
            <p className="text-white/40 text-sm mt-0.5">Here&apos;s your Malvik overview</p>
          </motion.div>

          {/* Live wallet card */}
          <LiveWalletCard />

          {/* Mock NOKS balance card */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-blue rounded-3xl p-6 sm:p-8 border border-blue-400/25 relative overflow-hidden glow-blue"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(45,106,255,0.2) 0%, transparent 70%)" }} />

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">NOKS balance</p>
                  <div className="flex items-end gap-3">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
                      {showBalance ? fmt(MOCK_BALANCE_NOKS) : "••••••"}
                    </h1>
                    <span className="text-blue-400 font-bold text-xl mb-1">NOKS</span>
                  </div>
                  <p className="text-white/30 text-sm mt-1">
                    ≈ ${showBalance ? fmt(MOCK_BALANCE_NOKS * 0.088) : "••••"} USD · mock balance
                  </p>
                </div>
                <button onClick={() => setShowBalance(!showBalance)}
                  className="text-white/30 hover:text-white transition-colors p-2 glass rounded-xl border border-white/10">
                  {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>

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

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="grid grid-cols-3 gap-4"
          >
            {[
              { label: "Sent this month",  value: "kr 5,000",  sub: "3 transactions",       icon: ArrowUpRight,  color: "text-red-400" },
              { label: "Received",         value: "kr 13,000", sub: "2 transactions",       icon: ArrowDownLeft, color: "text-green-400" },
              { label: "Avg. fee paid",    value: "0.3%",      sub: "vs 3.5% bank avg",     icon: TrendingUp,    color: "text-blue-400" },
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
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.24 }}
            className="glass rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <h2 className="text-white font-bold">Recent transactions</h2>
              <button className="text-blue-400 text-xs font-semibold hover:text-blue-300 transition-colors flex items-center gap-1">
                View all <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="divide-y divide-white/5">
              {loading ? (
                <div className="px-6 py-10 flex items-center justify-center gap-2 text-white/30 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading transactions…
                </div>
              ) : transactions.length === 0 ? (
                <div className="px-6 py-10 text-center text-white/30 text-sm">No transactions yet.</div>
              ) : transactions.map((tx, i) => (
                <motion.div key={tx.id}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.28 + i * 0.05 }}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-white/3 transition-colors group"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${tx.type === "sent" ? "bg-red-500/10" : "bg-green-500/10"}`}>
                    {tx.type === "sent"
                      ? <ArrowUpRight className="w-4 h-4 text-red-400" />
                      : <ArrowDownLeft className="w-4 h-4 text-green-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{tx.flag} {tx.label}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-white/30 text-xs">
                        {new Date(tx.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </span>
                      <span className="flex items-center gap-1 text-green-400/60 text-xs">
                        <CheckCircle2 className="w-3 h-3" /> confirmed
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`font-bold text-sm ${tx.type === "sent" ? "text-red-400" : "text-green-400"}`}>
                      {tx.type === "received" ? "+" : "-"}{fmt(tx.amount)}
                    </p>
                    <p className="text-white/30 text-xs">{tx.currency}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-white/15 group-hover:text-white/40 transition-colors flex-shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Subscription status */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.32 }}
            className="flex items-center justify-between glass rounded-2xl px-5 py-4 border border-white/10"
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-semibold">
                  {subLoading ? "Loading plan…" : `${planName} plan`}
                </p>
                <p className="text-white/35 text-xs mt-0.5">
                  {activePaidItem
                    ? `Renews ${activePaidItem.periodEnd ? new Date(activePaidItem.periodEnd).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—"}`
                    : "Upgrade to unlock lower fees and higher limits"}
                </p>
              </div>
            </div>
            <Link
              href="/pricing"
              className={`text-xs font-semibold px-4 py-2 rounded-xl transition-colors ${
                activePaidItem
                  ? "text-white/50 hover:text-white border border-white/10 hover:border-white/20"
                  : "btn-primary"
              }`}
            >
              {activePaidItem ? "Manage plan" : "Upgrade"}
            </Link>
          </motion.div>

          {/* Proto banner */}
          <div className="flex items-center gap-3 glass rounded-2xl px-5 py-3.5 border border-yellow-500/20 text-sm">
            <Globe className="w-4 h-4 text-yellow-400 flex-shrink-0" />
            <p className="text-white/50">
              <span className="text-yellow-400 font-semibold">Prototype</span> — NOKS balance is simulated.
              Connect a wallet to send real ETH on Base Sepolia testnet.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
