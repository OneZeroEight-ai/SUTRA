require("dotenv").config();
require("@nomicfoundation/hardhat-ethers");
require("hardhat-contract-sizer");
require("@nomicfoundation/hardhat-verify");

module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "cardona",
  networks: {
    cardona: {
      url: "https://rpc.cardona.zkevm-rpc.com",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 2442
    }
  },
  etherscan: {
    apiKey: "YFZ9KZSI8CK1UY5IR2MVDNB18VUUBIZN77",
    customChains: [
      {
        network: "cardona",
        chainId: 2442,
        urls: {
          apiURL: "https://explorer.cardona.zkevm-rpc.com/api",
          browserURL: "https://explorer.cardona.zkevm-rpc.com"
        }
      }
    ]
  },
  sourcify: {
    enabled: true
  }
};
