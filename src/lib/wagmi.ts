import { createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { injected, coinbaseWallet } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [
    injected({ target: "metaMask" }),
    coinbaseWallet({ appName: "Malvik" }),
    injected(),
  ],
  transports: {
    [baseSepolia.id]: http(),
  },
  ssr: true,
});

export { baseSepolia };
