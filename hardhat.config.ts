import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const SEPOLIA_NODE_URL = process.env.SEPOLIA_NODE_URL || "";
const MAINNET_NODE_URL = process.env.MAINNET_NODE_URL || "";
const SEPOLIA_DEPLOY_PRIVATE_KEY = process.env.SEPOLIA_DEPLOY_PRIVATE_KEY || "0000000000000000000000000000000000000000000000000000000000000000";
const MAINNET_DEPLOY_PRIVATE_KEY = process.env.MAINNET_DEPLOY_PRIVATE_KEY || "0000000000000000000000000000000000000000000000000000000000000000";


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.22",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    sepolia: {
      url: SEPOLIA_NODE_URL,
      accounts: [SEPOLIA_DEPLOY_PRIVATE_KEY!]
    },
    mainnet: {
      url: MAINNET_NODE_URL,
      accounts: [MAINNET_DEPLOY_PRIVATE_KEY!]
    }
  }
};

export default config;