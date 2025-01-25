const hre = require("hardhat");

async function main() {
 const SUTRA = await hre.ethers.getContractFactory("SUTRA");
 const sutra = await SUTRA.deploy();
 await sutra.waitForDeployment();
 console.log("SUTRA deployed to:", await sutra.getAddress());
}

main().catch((error) => {
 console.error(error);
 process.exit(1);
});
