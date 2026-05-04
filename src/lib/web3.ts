/ src/lib/web3.ts - Web3 utilities for Base Sepolia
import { BrowserProvider, Contract, parseUnits, formatUnits } from "ethers";

export const BASE_SEPOLIA_CHAIN_ID = 84532;
export const USDC_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
export const NOKS_ADDRESS = process.env.NEXT_PUBLIC_NOKS_ADDRESS ?? "";

export const ERC20_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function transfer(address to, uint256 amount) returns (bool)",
  ];
export const NOKS_ABI = [
    ...ERC20_ABI,
    "function mint(address to, uint256 amount) external",
  ];

declare global { interface Window { ethereum?: any; } }

export async function getProvider(): Promise<BrowserProvider> {
    if (!window.ethereum) throw new Error("MetaMask not found");
    return new BrowserProvider(window.ethereum);
}

export async function ensureBaseSepolia(): Promise<void> {
    const provider = await getProvider();
    const network = await provider.getNetwork();
    if (Number(network.chainId) !== BASE_SEPOLIA_CHAIN_ID) {
          await window.ethereum.request({
                  method: "wallet_switchEthereumChain",
                  params: [{ chainId: "0x14a34" }],
          });
    }
}

export async function getERC20Balance(tokenAddress: string, userAddress: string): Promise<string> {
    const provider = await getProvider();
    const contract = new Contract(tokenAddress, ERC20_ABI, provider);
    const [balance, decimals] = await Promise.all([
          contract.balanceOf(userAddress),
          contract.decimals(),
        ]);
    return formatUnits(balance, decimals);
}

export async function transferERC20(tokenAddress: string, toAddress: string, amount: string, decimals: number = 6): Promise<string> {
    await ensureBaseSepolia();
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const contract = new Contract(tokenAddress, ERC20_ABI, signer);
    const tx = await contract.transfer(toAddress, parseUnits(amount, decimals));
    await tx.wait();
    return tx.hash;
}

export async function mintNOKS(toAddress: string): Promise<string> {
    await ensureBaseSepolia();
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const contract = new Contract(NOKS_ADDRESS, NOKS_ABI, signer);
    const tx = await contract.mint(toAddress, parseUnits("1000", 6));
    await tx.wait();
    return tx.hash;
}

export async function transferETH(toAddress: string, amountEth: string): Promise<string> {
    await ensureBaseSepolia();
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const tx = await signer.sendTransaction({ to: toAddress, value: parseUnits(amountEth, 18) });
    await tx.wait();
    return tx.hash;
}

export async function connectWallet(): Promise<string> {
    const provider = await getProvider();
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0];
}
