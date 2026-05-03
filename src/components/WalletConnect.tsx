"use client";

import { useConnect, useDisconnect, useAccount, useChainId, useSwitchChain } from "wagmi";
import { baseSepolia } from "@/lib/wagmi";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Wallet, LogOut, ChevronDown, AlertTriangle, X } from "lucide-react";

function truncate(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const [open, setOpen] = useState(false);

  const wrongNetwork = isConnected && chainId !== baseSepolia.id;

  if (isConnected && address) {
    return (
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 glass rounded-xl px-3 py-2 border border-white/15 hover:border-white/25 transition-all text-sm"
        >
          {wrongNetwork ? (
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
          ) : (
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          )}
          <span className="text-white/80 font-mono text-xs">{truncate(address)}</span>
          <ChevronDown className="w-3.5 h-3.5 text-white/40" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-56 glass rounded-2xl border border-white/15 p-2 z-50 shadow-xl"
            >
              <div className="px-3 py-2 mb-1">
                <p className="text-white/40 text-xs">Connected</p>
                <p className="text-white font-mono text-xs mt-0.5 break-all">{address}</p>
              </div>

              {wrongNetwork && (
                <button
                  onClick={() => { switchChain({ chainId: baseSepolia.id }); setOpen(false); }}
                  disabled={isSwitching}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-yellow-400 hover:bg-yellow-500/10 transition-colors text-left"
                >
                  <AlertTriangle className="w-4 h-4" />
                  {isSwitching ? "Switching…" : "Switch to Base Sepolia"}
                </button>
              )}

              <button
                onClick={() => { disconnect(); setOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors text-left"
              >
                <LogOut className="w-4 h-4" />
                Disconnect
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {open && (
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 btn-primary text-sm px-4 py-2"
      >
        <Wallet className="w-4 h-4" />
        {isPending ? "Connecting…" : "Connect wallet"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-60 glass rounded-2xl border border-white/15 p-3 z-50 shadow-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">Connect wallet</p>
              <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-white/30 text-xs mb-3">
              Connects to <span className="text-blue-400 font-medium">Base Sepolia</span> testnet
            </p>

            <div className="space-y-1.5">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => { connect({ connector }); setOpen(false); }}
                  disabled={isPending}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/8 border border-white/10 hover:border-white/20 transition-all text-left group"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Wallet className="w-3.5 h-3.5 text-white/60" />
                  </div>
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                    {connector.name}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-white/20 text-xs mt-3 text-center">
              Need test ETH?{" "}
              <a
                href="https://www.alchemy.com/faucets/base-sepolia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                Get from faucet →
              </a>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />}
    </div>
  );
}
