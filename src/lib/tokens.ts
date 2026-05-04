// ─── Contract addresses ───────────────────────────────────────────────────────

export const TOKEN_ADDRESSES = {
  USDC: "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as `0x${string}`,
  NOKS: (process.env.NEXT_PUBLIC_NOKS_ADDRESS ?? "") as `0x${string}`,
  // EURC: no official Base Sepolia deployment yet — omitted from reads
} as const;

// ─── Minimal ERC-20 ABI ───────────────────────────────────────────────────────

export const ERC20_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    name: "decimals",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
  },
] as const;

// ─── NOKS ABI (ERC-20 + public mint for testnet faucet) ───────────────────────

export const NOKS_ABI = [
  ...ERC20_ABI,
  {
    name: "mint",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
] as const;

// ─── Token metadata ───────────────────────────────────────────────────────────

export type TokenSymbol = "NOKS" | "USDC" | "EURC";

export const TOKEN_META: Record<
  TokenSymbol,
  {
    symbol: TokenSymbol;
    decimals: number;
    color: string;
    bgColor: string;
    borderColor: string;
    comingSoon?: boolean;
  }
> = {
  NOKS: {
    symbol: "NOKS",
    decimals: 18,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-400/25",
  },
  USDC: {
    symbol: "USDC",
    decimals: 6,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
  EURC: {
    symbol: "EURC",
    decimals: 6,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    comingSoon: true,
  },
};
