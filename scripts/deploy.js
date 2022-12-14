// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");
const { ethers } = require("hardhat");
//for local testing
// const {
//   borrowLogic,
//   bridgeLogic,
//   emodeLogic,
//   flashLoanLogic,
//   liquidationLogic,
//   poolLogic,
//   supplyLogic,
//   configuratorLogic,
// } = require("../lib.js");

const {
  borrowLogic,
  bridgeLogic,
  emodeLogic,
  flashLoanLogic,
  liquidationLogic,
  poolLogic,
  supplyLogic,
  configuratorLogic,
} = require("../netlib.js");

async function main() {
  const accounts = await hre.ethers.getSigners();
  const owner = accounts[0];
  // console.log("owner.address");
  // Deploy SequencerOracle

  const SequencerOracle = await hre.ethers.getContractFactory(
    "SequencerOracle"
  );
  const sequencerOracle = await SequencerOracle.deploy(owner.address);

  await sequencerOracle.deployed();

  console.log(`SequencerOracle deployed to: ${sequencerOracle.address}`);
  //  <-->
  // Deploy PoolAddressesProvider

  const PoolAddressesProvider = await hre.ethers.getContractFactory(
    "PoolAddressesProvider"
  );
  const poolAddressesProvider = await PoolAddressesProvider.deploy(
    "Test Aave Market",
    owner.address
  );

  await poolAddressesProvider.deployed();
  await poolAddressesProvider.setACLAdmin(owner.address);

  console.log(
    `PoolAddressesProvider deployed to : ${poolAddressesProvider.address}`
  );

  // // <-->
  // Deploy ACL Manager

  const ACLManager = await hre.ethers.getContractFactory("ACLManager");
  const aclManager = await ACLManager.deploy(
    `${poolAddressesProvider.address}`
    // "0xb35F225fF381FD620CA93Ec058aC44a39498408a"
  );

  await aclManager.deployed();

  console.log(`ACLManager deployed to : ${aclManager.address}`);

  // Deploy PoolAddressesProviderRegistry
  const PoolAddressesProviderRegistry = await hre.ethers.getContractFactory(
    "PoolAddressesProviderRegistry"
  );
  const poolAddressesProviderRegistry =
    await PoolAddressesProviderRegistry.deploy(
      `${owner.address}`
      // "0xb35F225fF381FD620CA93Ec058aC44a39498408a"
    );

  await poolAddressesProviderRegistry.deployed();

  console.log(
    `PoolAddressesProviderRegistry deployed to : ${poolAddressesProviderRegistry.address}`
  );

  // Deploy Price oracle Sentinel

  const PriceOracleSentinel = await hre.ethers.getContractFactory(
    "PriceOracleSentinel"
  );

  const gracePeriod = 36000;
  const priceOracleSentinel = await PriceOracleSentinel.deploy(
    `${poolAddressesProvider.address}`,
    `${sequencerOracle.address}`,
    gracePeriod
    // "0xb35F225fF381FD620CA93Ec058aC44a39498408a"
  );

  await priceOracleSentinel.deployed();

  console.log(
    `PriceOracleSentinel deployed to : ${priceOracleSentinel.address}`
  );

  //Deploy PoolStorage
  const PoolStorage = await hre.ethers.getContractFactory("PoolStorage");

  const poolStorage = await PoolStorage.deploy();

  await poolStorage.deployed();

  console.log(`PoolStorage deployed to : ${poolStorage.address}`);

  // Deploy AToken
  const AToken = await hre.ethers.getContractFactory("AToken");

  const aToken = await AToken.deploy(l2pool.address);

  await aToken.deployed();

  console.log(`AToken deployed to : ${aToken.address}`);

  // Deploy DelegationAwareAToken
  const DelegationAwareAToken = await hre.ethers.getContractFactory(
    "DelegationAwareAToken"
  );

  const delegationAwareAToken = await DelegationAwareAToken.deploy(
    l2pool.address
  );

  await delegationAwareAToken.deployed();

  console.log(
    `DelegationAwareAToken deployed to : ${delegationAwareAToken.address}`
  );

  // Deploy StableDebtToken
  const StableDebtToken = await hre.ethers.getContractFactory(
    "StableDebtToken"
  );

  const stableDebtToken = await StableDebtToken.deploy(l2pool.address);

  await stableDebtToken.deployed();

  console.log(`StableDebtToken deployed to : ${stableDebtToken.address}`);

  // Deploy VariableDebtToken
  const VariableDebtToken = await hre.ethers.getContractFactory(
    "VariableDebtToken"
  );

  const variableDebtToken = await VariableDebtToken.deploy(l2pool.address);

  await variableDebtToken.deployed();

  console.log(`VariableDebtToken deployed to : ${variableDebtToken.address}`);

  /// Deploy DefaultReserveInterestRateStrategy
  const DefaultReserveInterestRateStrategy =
    await hre.ethers.getContractFactory("DefaultReserveInterestRateStrategy");

  const optimalUsageRatio = ethers.BigNumber.from(450000000000000000000000000n);
  const variableRateSlope1 = ethers.BigNumber.from(70000000000000000000000000n);
  const variableRateSlope2 =
    ethers.BigNumber.from(3000000000000000000000000000n);
  const baseStableRateOffset =
    ethers.BigNumber.from(800000000000000000000000000n);
  const stableRateExcessOffset =
    ethers.BigNumber.from(550000000000000000000000000n);
  const optimalStableToTotalDebtRatio =
    ethers.BigNumber.from(200000000000000000000000000n);

  const defaultReserveInterestRateStrategy =
    await DefaultReserveInterestRateStrategy.deploy(
      `${poolAddressesProvider.address}`,
      optimalUsageRatio,
      0,
      variableRateSlope1,
      variableRateSlope2,
      0,
      0,
      baseStableRateOffset,
      stableRateExcessOffset,
      optimalStableToTotalDebtRatio
    );

  await defaultReserveInterestRateStrategy.deployed();

  console.log(
    `DefaultReserveInterestRateStrategy deployed to : ${defaultReserveInterestRateStrategy.address}`
  );
  // Deploy PoolConfigurator
  const PoolConfigurator = await hre.ethers.getContractFactory(
    "PoolConfigurator",
    {
      libraries: {
        ConfiguratorLogic: configuratorLogic,
      },
    }
  );

  const poolConfigurator = await PoolConfigurator.deploy();

  await poolConfigurator.deployed();

  console.log(`PoolConfigurator deployed to : ${poolConfigurator.address}`);

  // Deploy pool
  const Pool = await hre.ethers.getContractFactory("Pool", {
    libraries: {
      BorrowLogic: borrowLogic,
      BridgeLogic: bridgeLogic,
      EModeLogic: emodeLogic,
      FlashLoanLogic: flashLoanLogic,
      LiquidationLogic: liquidationLogic,
      PoolLogic: poolLogic,
      SupplyLogic: supplyLogic,
    },
  });

  const pool = await Pool.deploy(`${poolAddressesProvider.address}`);

  await pool.deployed();

  console.log(`Pool deployed to : ${pool.address}`);

  // Deploy L2 pool
  const L2Pool = await hre.ethers.getContractFactory("L2Pool", {
    libraries: {
      BorrowLogic: borrowLogic,
      BridgeLogic: bridgeLogic,
      EModeLogic: emodeLogic,
      FlashLoanLogic: flashLoanLogic,
      LiquidationLogic: liquidationLogic,
      PoolLogic: poolLogic,
      SupplyLogic: supplyLogic,
    },
  });

  const l2pool = await L2Pool.deploy(`${poolAddressesProvider.address}`);

  await l2pool.deployed();

  console.log(`L2Pool deployed to : ${l2pool.address}`);

  fs.writeFileSync(
    "./config.js",
    `//SequencerOracle deployed to : "${sequencerOracle.address}"
      //PoolAddressesProvider deployed to : "${poolAddressesProvider.address}"
      //ACLManager deployed to : "${aclManager.address}"
      //PoolAddressesProviderRegistry deployed to : "${poolAddressesProviderRegistry.address}"
      //PriceOracleSentinel deployed to : "${priceOracleSentinel.address}"
      //L2Pool deployed to : "${l2pool.address}"
      //PoolConfigurator deployed to : ${poolConfigurator.address}
      //PoolStorage deployed to :  ${poolStorage.address}
      //AToken deployed to : ${aToken.address}
      ///DelegationAwareAToken deployed to : ${delegationAwareAToken.address}
      //StableDebtToken deployed to : ${stableDebtToken.address}
      //VariableDebtToken deployed to : ${variableDebtToken.address}
      //DefaultReserveInterestRateStrategy deployed to : ${defaultReserveInterestRateStrategy.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
