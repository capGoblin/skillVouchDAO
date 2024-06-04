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
  },
};

export default config;