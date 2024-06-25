import "./App.css";
import HomePage from "./components/HomePage";
import { WagmiProvider, createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { base } from "viem/chains";
import { wagmiConfig } from "../src/lib/wagmi";
import { ReactNode } from "react";

type Props = { children: ReactNode };

// const wagmiConfig = createConfig({
//   chains: [baseSepolia],
//   connectors: [
//     coinbaseWallet({
//       // appChainIds: [baseSepolia.id],
//       appName: "onchainkit",
//     }),
//   ],
//   ssr: true,
//   transports: {
//     [baseSepolia.id]: http(),
//   },
// });
const queryClient = new QueryClient();

function App() {
  const apiKey = import.meta.env.VITE_ONCHAIN_KIT;

  return (
    <>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <OnchainKitProvider apiKey={apiKey} chain={base}>
            <HomePage />
          </OnchainKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
