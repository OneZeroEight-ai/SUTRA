const { ethers } = require("hardhat");

// Contract addresses
const SUTRA_ADDRESS = "0xa3E6B93F19Cf3716Ccf960D905d2f1D8Ad87947C";

async function main() {
    const [owner] = await ethers.getSigners();
    
    // Get SUTRA contract instance
    const SUTRA = await ethers.getContractFactory("SUTRA");
    const sutra = SUTRA.attach(SUTRA_ADDRESS);

    console.log("\nSetting up Basic Access Preservation:");
    console.log("====================================");
    console.log("Owner address:", owner.address);

    try {
        // Check initial balance
        const initialBalance = await sutra.balanceOf(owner.address);
        console.log("\nInitial balance:", ethers.formatEther(initialBalance), "SUTRA");

        // Amount for Basic Access (108 SUTRA)
        const transferAmount = ethers.parseEther("108");

        // Regular token transfer for basic access
        const tx = await sutra.transfer(owner.address, transferAmount);
        await tx.wait();
        
        // Check new balance
        const newBalance = await sutra.balanceOf(owner.address);
        console.log("New balance:", ethers.formatEther(newBalance), "SUTRA");

        // Evaluate preservation rights
        const evalTx = await sutra.evaluatePreservationRights(owner.address);
        await evalTx.wait();
        console.log("\nPreservation rights evaluated");

    } catch (error) {
        console.error("\nError:", error.message);
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });