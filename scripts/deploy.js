const { ethers } = require("hardhat");

async function main() {
  console.log("Starting SUTRA deployment...");

  // Deploy SUTRAAlignment first
  console.log("Deploying SUTRAAlignment...");
  const SUTRAAlignment = await ethers.getContractFactory("SUTRAAlignment");
  const alignment = await SUTRAAlignment.deploy();
  await alignment.waitForDeployment();
  console.log("SUTRAAlignment deployed to:", await alignment.getAddress());

  // Deploy SUTRA main contract
  console.log("Deploying SUTRA token...");
  const SUTRA = await ethers.getContractFactory("SUTRA");
  const sutra = await SUTRA.deploy();
  await sutra.waitForDeployment();
  console.log("SUTRA deployed to:", await sutra.getAddress());

  // Verify deployment
  const initialSupply = await sutra.INITIAL_SUPPLY();
  console.log("Initial supply:", ethers.formatEther(initialSupply));
  
  const totalSupply = await sutra.TOTAL_SUPPLY();
  console.log("Total supply:", ethers.formatEther(totalSupply));

  // Log pool allocations
  const preservationPool = await sutra.PRESERVATION_POOL();
  const communityDev = await sutra.COMMUNITY_DEVELOPMENT();
  const foundingContrib = await sutra.FOUNDING_CONTRIBUTORS();
  const operations = await sutra.OPERATIONS();
  const emergencyReserve = await sutra.EMERGENCY_RESERVE();

  console.log("\nPool Allocations:");
  console.log("================");
  console.log("Preservation Pool:", ethers.formatEther(preservationPool));
  console.log("Community Development:", ethers.formatEther(communityDev));
  console.log("Founding Contributors:", ethers.formatEther(foundingContrib));
  console.log("Operations:", ethers.formatEther(operations));
  console.log("Emergency Reserve:", ethers.formatEther(emergencyReserve));

  console.log("\nDeployment completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });