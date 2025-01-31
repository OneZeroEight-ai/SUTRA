const { ethers } = require("hardhat");

async function main() {
   console.log("Deploying fixed SUTRA contract...");

   // Deploy SUTRAAlignment first
   const SUTRAAlignment = await ethers.getContractFactory("SUTRAAlignment");
   const alignment = await SUTRAAlignment.deploy();
   await alignment.waitForDeployment();
   console.log("SUTRAAlignment deployed to:", await alignment.getAddress());

   // Deploy fixed SUTRA
   const SUTRA = await ethers.getContractFactory("SUTRA");
   const sutra = await SUTRA.deploy();
   await sutra.waitForDeployment();
   console.log("Fixed SUTRA deployed to:", await sutra.getAddress());

   // Transfer ownership and setup
   console.log("\nVerifying deployment...");
   const initialSupply = await sutra.INITIAL_SUPPLY();
   const totalSupply = await sutra.TOTAL_SUPPLY();
   console.log("Initial supply:", ethers.formatEther(initialSupply));
   console.log("Total supply:", ethers.formatEther(totalSupply));
}

main()
   .then(() => process.exit(0))
   .catch(error => {
       console.error(error);
       process.exit(1);
   });