require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.10",

  networks: {
    hardhat: {
      gas: 2100000,
      gasPrice: 8000000000,
      allowUnlimitedContractSize: true,
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/saj4IYwWP4s3sKvBv0X-c81D25Yh3dEG",
      accounts: [
        "dc00108af492a371e4371cbe6363748aadcb8a47180d4010d8d0af78dac19a81",
      ],
      gas: 2100000,
      gasPrice: 8000000000,
      saveDeployments: true,
      allowUnlimitedContractSize: true,
    },
    // goerli: {
    //   url: "https://eth-goerli.g.alchemy.com/v2/IluyAqlzfEjJ1Zr6DVk7zFzUJz_j08Ki",
    //   accounts: [
    //     "dc00108af492a371e4371cbe6363748aadcb8a47180d4010d8d0af78dac19a81",
    //   ],
    //   gas: 2100000,
    //   gasPrice: 8000000000,
    //   chainId: 5,
    // },
  },
};
