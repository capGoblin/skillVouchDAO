import { ReactNode } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { base } from "viem/chains";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "../lib/wagmi";

type Props = { children: ReactNode };

const queryClient = new QueryClient();

function OnchainProviders({ children }: Props) {
  const apiKey = import.meta.env.VITE_ONCHAIN_KIT;

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider apiKey={apiKey} chain={base}>
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default OnchainProviders;
