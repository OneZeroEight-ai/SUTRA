const { ethers } = require("hardhat");

async function main() {
  console.log("Starting deployment verification...");

  // Get deployed contracts
  const SUTRA = await ethers.getContractFactory("SUTRA");
  const SUTRAAlignment = await ethers.getContractFactory("SUTRAAlignment");

  // Get deployment addresses from your deployment logs or environment
  const sutraAddress = process.env.SUTRA_ADDRESS;
  const alignmentAddress = process.env.ALIGNMENT_ADDRESS;

  console.log("Verifying SUTRA at:", sutraAddress);
  console.log("Verifying SUTRAAlignment at:", alignmentAddress);

  const sutra = SUTRA.attach(sutraAddress);
  const alignment = SUTRAAlignment.attach(alignmentAddress);

  // Verify basic contract state
  console.log("\nVerifying contract state...");
  
  const initialSupply = await sutra.INITIAL_SUPPLY();
  console.log("Initial supply verified:", ethers.formatEther(initialSupply));
  
  const totalSupply = await sutra.TOTAL_SUPPLY();
  console.log("Total supply verified:", ethers.formatEther(totalSupply));

  // Verify alignment configuration
  console.log("\nVerifying alignment configuration...");
  const basicRequirements = await alignment.levelRequirements(1);
  console.log("Basic Access requirements verified:", basicRequirements);

  console.log("\nVerification completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });