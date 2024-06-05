import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition-ethers";
import "dotenv/config";

const config: any = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: process.env.NETWORK_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    // etherscan: {
    //   // Your API key for Etherscan
    //   // Obtain one at https://etherscan.io/
    //   apiKey: process.env.ETHERSCAN_API_KEY,
    // },
    // sourcify: {
    //   // Disabled by default
    //   // Doesn't need an API key
    //   enabled: true,
    // },
  },
};

export default config;
