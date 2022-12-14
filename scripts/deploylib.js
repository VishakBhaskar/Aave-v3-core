const hre = require("hardhat");
const fs = require("fs");
const { ethers } = require("hardhat");

async function main() {
  // Deploy Borrow Logic
  const BorrowLogic = await hre.ethers.getContractFactory("BorrowLogic");
  const borrowLogic = await BorrowLogic.deploy();

  await borrowLogic.deployed();

  console.log(`BorrowLogic deployed to : "${borrowLogic.address}"`);

  // Deploy BridgeLogics
  const BridgeLogic = await hre.ethers.getContractFactory("BridgeLogic");
  const bridgeLogic = await BridgeLogic.deploy();

  await bridgeLogic.deployed();

  console.log(`BridgeLogic deployed to : "${bridgeLogic.address}"`);

  // Deploy EModeLogic
  const EModeLogic = await hre.ethers.getContractFactory("EModeLogic");
  const emodeLogic = await EModeLogic.deploy();

  await emodeLogic.deployed();

  console.log(`EModeLogic deployed to : "${emodeLogic.address}"`);

  // Deploy FlashLoanLogic

  const FlashLoanLogic = await hre.ethers.getContractFactory("FlashLoanLogic", {
    libraries: {
      BorrowLogic: borrowLogic.address,
    },
  });
  const flashLoanLogic = await FlashLoanLogic.deploy();

  await flashLoanLogic.deployed();

  console.log(`FlashLoanLogic deployed to : "${flashLoanLogic.address}"`);

  // Deploy LiquidationLogic

  const LiquidationLogic = await hre.ethers.getContractFactory(
    "LiquidationLogic"
  );
  const liquidationLogic = await LiquidationLogic.deploy();

  await liquidationLogic.deployed();

  console.log(`LiquidationLogic deployed to : "${liquidationLogic.address}"`);

  // Deploy PoolLogic
  const PoolLogic = await hre.ethers.getContractFactory("PoolLogic");
  const poolLogic = await PoolLogic.deploy();

  await poolLogic.deployed();

  console.log(`PoolLogic deployed to : "${poolLogic.address}"`);

  //Deploy SupplyLogic
  const SupplyLogic = await hre.ethers.getContractFactory("SupplyLogic");
  const supplyLogic = await SupplyLogic.deploy();

  await supplyLogic.deployed();

  console.log(`SupplyLogic deployed to : "${supplyLogic.address}"`);

  // Deploy ConfiguratorLogic
  const ConfiguratorLogic = await hre.ethers.getContractFactory(
    "ConfiguratorLogic"
  );
  const configuratorLogic = await ConfiguratorLogic.deploy();

  await configuratorLogic.deployed();

  console.log(`ConfiguratorLogic deployed to : "${configuratorLogic.address}"`);

  fs.writeFileSync(
    "./lib.js",
    `const borrowLogic = "${borrowLogic.address}"
     const bridgeLogic = "${bridgeLogic.address}"
     const emodeLogic = "${emodeLogic.address}"
     const flashLoanLogic = "${flashLoanLogic.address}"
     const liquidationLogic = "${liquidationLogic.address}"
     const poolLogic = "${poolLogic.address}"
     const supplyLogic = "${supplyLogic.address}"
     const configuratorLogic = "${configuratorLogic.address}"
     module.exports = {borrowLogic, bridgeLogic, emodeLogic, flashLoanLogic, liquidationLogic, poolLogic, supplyLogic, configuratorLogic};`
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
