"use client";
// src/components/SendModal.tsx - Send modal with token selector + on-chain transfer
import { useState } from "react";
import { transferERC20, transferETH, USDC_ADDRESS, NOKS_ADDRESS } from "@/lib/web3";
import { saveTransaction } from "@/lib/supabase";

type Token = "NOKS" | "USDC" | "ETH";

interface SendModalProps {
    account: string;
    onClose: () => void;
    onSent: () => void;
}

export default function SendModal({ account, onClose, onSent }: SendModalProps) {
    const [token, setToken] = useState<Token>("NOKS");
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");

  const handleSend = async () => {
        setError("");
        if (!to || !amount) { setError("Fill in all fields"); return; }
        setSending(true);
        try {
                let txHash = "";
                if (token === "NOKS") {
                          if (!NOKS_ADDRESS) { setError("NOKS contract not deployed yet"); setSending(false); return; }
                          txHash = await transferERC20(NOKS_ADDRESS, to, amount, 6);
                } else if (token === "USDC") {
                          txHash = await transferERC20(USDC_ADDRESS, to, amount, 6);
                } else {
                          txHash = await transferETH(to, amount);
                }
                await saveTransaction({
                          user_address: account.toLowerCase(),
                          to_address: to.toLowerCase(),
                          amount,
                          token,
                          tx_hash: txHash,
                });
                await fetch("/api/transactions", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ user_address: account.toLowerCase(), to_address: to.toLowerCase(), amount, token, tx_hash: txHash }),
                });
                onSent();
                onClose();
        } catch (e: any) {
                setError(e.message ?? "Transaction failed");
        } finally {
                setSending(false);
        }
  };

  return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
                <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-700" onClick={e => e.stopPropagation()}>
                          <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-bold">Send</h2>h2>
                                    <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">x</button>button>
                          </div>div>
                
                  {/* Token selector */}
                        <div className="flex gap-2 mb-5">
                          {(["NOKS", "USDC", "ETH"] as Token[]).map(t => (
                      <button key={t} onClick={() => setToken(t)} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${token === t ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}>
                        {t}
                      </button>button>
                    ))}
                        </div>div>
                
                        <div className="space-y-4">
                                  <div>
                                              <label className="block text-xs text-gray-400 mb-1">To address</label>label>
                                              <input value={to} onChange={e => setTo(e.target.value)} placeholder="0x..." className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-blue-500" />
                                  </div>div>
                                  <div>
                                              <label className="block text-xs text-gray-400 mb-1">Amount ({token})</label>label>
                                              <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" type="number" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                                  </div>div>
                          {error && <p className="text-red-400 text-xs">{error}</p>p>}
                                  <button onClick={handleSend} disabled={sending} className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg font-semibold transition-colors">
                                    {sending ? "Sending..." : `Send ${token}`}
                                  </button>button>
                        </div>div>
                </div>div>
        </div>div>
      );
}</div>
