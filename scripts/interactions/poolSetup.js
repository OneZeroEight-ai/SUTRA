const { ethers } = require("hardhat");

// Contract addresses
const SUTRA_ADDRESS = "0xa3E6B93F19Cf3716Ccf960D905d2f1D8Ad87947C";

async function main() {
    const [owner] = await ethers.getSigners();
    
    // Get SUTRA contract instance
    const SUTRA = await ethers.getContractFactory("SUTRA");
    const sutra = SUTRA.attach(SUTRA_ADDRESS);

    console.log("\nAllocating from Preservation Pool:");
    console.log("==================================");
    console.log("Address:", owner.address);

    try {
        // Check initial balance
        const initialBalance = await sutra.balanceOf(owner.address);
        console.log("\nInitial balance:", ethers.formatEther(initialBalance), "SUTRA");

        // Check preservation pool size
        const poolSize = await sutra.PRESERVATION_POOL();
        console.log("Preservation Pool size:", ethers.formatEther(poolSize), "SUTRA");

        // Amount for Basic Access (108 SUTRA)
        const allocationAmount = ethers.parseEther("108");

        console.log("\nAttempting pool allocation...");
        // Use allocateToPreservationPool function
        const tx = await sutra.allocateToPreservationPool(owner.address, allocationAmount);
        await tx.wait();
        console.log("Pool allocation successful");
        
        // Check updated balance
        const newBalance = await sutra.balanceOf(owner.address);
        console.log("\nNew balance:", ethers.formatEther(newBalance), "SUTRA");

        // Evaluate preservation rights
        console.log("\nEvaluating preservation rights...");
        const evalTx = await sutra.evaluatePreservationRights(owner.address);
        await evalTx.wait();
        console.log("Preservation rights evaluated");

    } catch (error) {
        console.error("\nError:", error.message);
        console.log("\nDetailed error info:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });