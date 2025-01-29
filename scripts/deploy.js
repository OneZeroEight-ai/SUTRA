const hre = require("hardhat");

async function main() {
  const SUTRAToken = await hre.ethers.getContractFactory("SUTRAToken");
  console.log("Deploying SUTRA token...");
  const sutra = await SUTRAToken.deploy();
  await sutra.waitForDeployment();
  console.log("SUTRA token deployed to:", await sutra.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
