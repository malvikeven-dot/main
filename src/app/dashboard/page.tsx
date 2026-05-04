"use client";
import { useState, useCallback } from "react";
import TokenPanel from "@/components/TokenPanel";
import SendModal from "@/components/SendModal";
import TransactionHistory from "@/components/TransactionHistory";
import { connectWallet, getERC20Balance, USDC_ADDRESS, NOKS_ADDRESS, getProvider } from "@/lib/web3";
import { getTransactions, Transaction } from "@/lib/supabase";
import { formatUnits } from "ethers";

export default function DashboardPage() {
    const [account, setAccount] = useState<string | null>(null);
    const [noksBalance, setNoksBalance] = useState<string | null>(null);
    const [usdcBalance, setUsdcBalance] = useState<string | null>(null);
    const [ethBalance, setEthBalance] = useState<string | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [sendOpen, setSendOpen] = useState(false);
    const [loading, setLoading] = useState(false);

  const fetchBalances = useCallback(async (addr: string) => {
        setLoading(true);
        try {
                const [usdc, noks] = await Promise.all([
                          getERC20Balance(USDC_ADDRESS, addr),
                          NOKS_ADDRESS ? getERC20Balance(NOKS_ADDRESS, addr) : Promise.resolve(null),
                        ]);
                setUsdcBalance(usdc);
                setNoksBalance(noks);
                const provider = await getProvider();
                const eth = await provider.getBalance(addr);
                setEthBalance(formatUnits(eth, 18));
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
  }, []);

  const fetchTxHistory = useCallback(async (addr: string) => {
        const txs = await getTransactions(addr);
        setTransactions(txs);
  }, []);

  const handleConnect = async () => {
        try {
                const addr = await connectWallet();
                setAccount(addr);
                await fetchBalances(addr);
                await fetchTxHistory(addr);
        } catch (e: any) { alert(e.message); }
  };

  const handleSent = () => {
        if (account) { fetchBalances(account); fetchTxHistory(account); }
  };

  return (
        <main className="min-h-screen bg-gray-950 text-white p-6">
              <div className="max-w-5xl mx-auto">
                      <div className="flex items-center justify-between mb-8">
                                <h1 className="text-2xl font-bold">Malvik Wallet</h1>h1>
                        {!account ? (
                      <button onClick={handleConnect} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium">
                                    Connect MetaMask
                      </button>button>
                    ) : (
                      <div className="flex items-center gap-3">
                                    <span className="text-xs text-gray-400 font-mono">{account.slice(0,6)}...{account.slice(-4)}</span>span>
                                    <button onClick={() => setSendOpen(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium">Send</button>button>
                      </div>div>
                                )}
                      </div>div>
                      <TokenPanel account={account} noksBalance={noksBalance} usdcBalance={usdcBalance} ethBalance={ethBalance} loading={loading} onRefresh={() => account && fetchBalances(account)} onMinted={handleSent} />
                {account && <TransactionHistory transactions={transactions} />}
                {sendOpen && account && <SendModal account={account} onClose={() => setSendOpen(false)} onSent={handleSent} />}
              </div>div>
        </main>main>
      );
}</main>
