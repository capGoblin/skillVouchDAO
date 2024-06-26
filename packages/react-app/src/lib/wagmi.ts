import { createConfig, http } from "wagmi";
import { baseSepolia, zoraSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";
// export const wagmiConfig = createConfig({
//   chains: [base],
//   multiInjectedProviderDiscovery: false,
//   connectors: [
//     coinbaseWallet({
//       appName: "yourAppName",
//       preference: "all",
//       version: "4",
//     }),
//   ],
//   ssr: true,
//   transports: {
//     [base.id]: http(),
//   },
// });

export const wagmiConfig = createConfig({
  chains: [baseSepolia, zoraSepolia],
  connectors: [
    coinbaseWallet({
      // appChainIds: [baseSepolia.id],
      appName: "onchainkit",
    }),
  ],
  ssr: true,
  transports: {
    [baseSepolia.id]: http(),
    [zoraSepolia.id]: http(),
  },
});
