const hre = require("hardhat");

async function main() {
 const sutra1 = await hre.ethers.getContractAt("SUTRA", "0xfbE65e40deeA2A56F8E802Fecef343a8103e0De7");
 const sutra2 = await hre.ethers.getContractAt("SUTRA", "0xa3E6B93F19Cf3716Ccf960D905d2f1D8Ad87947C"); 
 const deployer = (await hre.ethers.getSigners())[0].address;

 const balance1 = await sutra1.balanceOf(deployer);
 console.log(`First Deployment (0xfbE6...De7):`);
 console.log(`Balance: ${hre.ethers.formatEther(balance1)} SUTRA`);
 const total1 = await sutra1.totalSupply();
 console.log(`Total Supply: ${hre.ethers.formatEther(total1)} SUTRA\n`);

 const balance2 = await sutra2.balanceOf(deployer);
 console.log(`Second Deployment (0xa3E6...47C):`);
 console.log(`Balance: ${hre.ethers.formatEther(balance2)} SUTRA`);
 const total2 = await sutra2.totalSupply();
 console.log(`Total Supply: ${hre.ethers.formatEther(total2)} SUTRA`);
}

main().catch((error) => {
 console.error(error);
 process.exit(1);
});
