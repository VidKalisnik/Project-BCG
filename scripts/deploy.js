const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying...");
  const Contract = await ethers.getContractFactory("nftFactory");
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log("Deployed. Address " + contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
