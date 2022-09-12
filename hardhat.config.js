require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const AURORA_RPC_URL = process.env.AURORA_RPC_URL;
const AURORA_PRIVATE_KEY = process.env.AURORA_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    aurora: {
      url: AURORA_RPC_URL,
      accounts: [AURORA_PRIVATE_KEY],
      chainId: 1313161555,
      blockConfirmations: 6,
    },
  },
};
