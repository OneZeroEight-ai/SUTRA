const { ethers } = require("hardhat");

// Contract addresses from deployment
const SUTRA_ADDRESS = "0xa3E6B93F19Cf3716Ccf960D905d2f1D8Ad87947C";

async function main() {
    const [owner] = await ethers.getSigners();
    
    // Get SUTRA contract instance
    const SUTRA = await ethers.getContractFactory("SUTRA");
    const sutra = SUTRA.attach(SUTRA_ADDRESS);

    // Address to receive Basic Access allocation
    const recipientAddress = "0xe8f5A8aF4d8cdaa67bD767261695e156Fde65CeD";
    
    // Amount for Basic Access (108 SUTRA)
    const allocationAmount = ethers.parseEther("108");

    console.log("\nAllocating tokens for Basic Access:");
    console.log("==================================");
    console.log("Recipient:", recipientAddress);
    console.log("Amount:", ethers.formatEther(allocationAmount), "SUTRA");

    try {
        // Allocate tokens from preservation pool
        const tx = await sutra.allocateToPreservationPool(recipientAddress, allocationAmount);
        await tx.wait();
        console.log("Allocation successful");

        // Check new balance
        const newBalance = await sutra.balanceOf(recipientAddress);
        console.log("New balance:", ethers.formatEther(newBalance), "SUTRA");

        // Evaluate preservation rights
        const evalTx = await sutra.evaluatePreservationRights(recipientAddress);
        await evalTx.wait();
        console.log("Preservation rights evaluated");
    } catch (error) {
        console.error("Error:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });