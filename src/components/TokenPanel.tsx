"use client";
// src/components/TokenPanel.tsx
// Three token cards: USDC (live), NOKS (live + faucet), EURC (coming soon)
import { useState } from "react";
import { mintNOKS, NOKS_ADDRESS } from "@/lib/web3";

interface TokenPanelProps {
    account: string | null;
    noksBalance: string | null;
    usdcBalance: string | null;
    ethBalance: string | null;
    loading: boolean;
    onRefresh: () => void;
    onMinted: () => void;
}

function Shimmer() {
    return <div className="h-8 w-28 bg-gray-700 rounded animate-pulse" />;
}

export default function TokenPanel({ account, noksBalance, usdcBalance, ethBalance, loading, onRefresh, onMinted }: TokenPanelProps) {
    const [minting, setMinting] = useState(false);

  const handleMint = async () => {
        if (!account) return;
        setMinting(true);
        try {
                await mintNOKS(account);
                onMinted();
        } catch (e: any) {
                alert(e.message ?? "Mint failed");
        } finally {
                setMinting(false);
        }
  };

  return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* USDC Card */}
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                      <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">$</div>div>
                                <span className="text-sm font-semibold text-gray-300">USDC</span>span>
                      </div>div>
                      <div className="text-2xl font-bold mb-1">
                        {loading ? <Shimmer /> : account ? (usdcBalance ? `${parseFloat(usdcBalance).toFixed(2)} USDC` : "0.00 USDC") : <span className="text-gray-500 text-base">Connect wallet</span>span>}
                      </div>div>
                      <p className="text-xs text-gray-500">Base Sepolia USDC</p>p>
              </div>div>
        
          {/* NOKS Card (hero) */}
              <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-6 border border-blue-700 ring-2 ring-blue-500/30">
                      <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-xs font-bold text-blue-900">N</div>div>
                                <span className="text-sm font-semibold text-blue-200">NOKS</span>span>
                                <span className="ml-auto text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">Testnet</span>span>
                      </div>div>
                      <div className="text-2xl font-bold mb-1">
                        {loading || minting ? <Shimmer /> : account ? (NOKS_ADDRESS ? (noksBalance ? `${parseFloat(noksBalance).toFixed(2)} NOKS` : "0.00 NOKS") : <span className="text-yellow-400 text-sm">Deploy contract first</span>span>) : <span className="text-gray-400 text-base">Connect wallet</span>span>}
                      </div>div>
                      <p className="text-xs text-blue-300/70 mb-4">Norwegian Krone Stablecoin</p>p>
                {account && NOKS_ADDRESS && (
                    <button onClick={handleMint} disabled={minting} className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg text-xs font-semibold transition-colors">
                      {minting ? "Minting..." : "Get 1,000 test NOKS"}
                    </button>button>
                      )}
              </div>div>
        
          {/* EURC Card */}
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 opacity-60">
                      <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold text-yellow-900">E</div>div>
                                <span className="text-sm font-semibold text-gray-300">EURC</span>span>
                                <span className="ml-auto text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded-full">Soon</span>span>
                      </div>div>
                      <div className="text-2xl font-bold text-gray-500 mb-1">—</div>div>
                      <p className="text-xs text-gray-600">Coming soon — no Base Sepolia deployment from Circle yet</p>p>
              </div>div>
        </div>div>
      );
}</div>
