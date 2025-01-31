const { ethers } = require("hardhat");

// Contract addresses from deployment
const SUTRA_ADDRESS = "0xa3E6B93F19Cf3716Ccf960D905d2f1D8Ad87947C";
const ALIGNMENT_ADDRESS = "0xfbE65e40deeA2A56F8E802Fecef343a8103e0De7";

async function main() {
    const [owner] = await ethers.getSigners();
    
    // Get contract instances
    const SUTRAAlignment = await ethers.getContractFactory("SUTRAAlignment");
    const alignment = SUTRAAlignment.attach(ALIGNMENT_ADDRESS);

    // Set high alignment metrics for owner
    const ownerMetrics = {
        understanding: 95,  // Right Understanding
        intention: 95,     // Right Intention
        communication: 95, // Right Speech
        action: 95,       // Right Action
        sustainability: 95, // Right Livelihood
        effort: 95,       // Right Effort
        mindfulness: 95,  // Right Mindfulness
        focus: 95         // Right Concentration
    };

    console.log("\nSetting up owner alignment:");
    console.log("===========================");
    console.log("Owner address:", owner.address);

    try {
        // Update owner alignment metrics
        console.log("Updating owner alignment metrics...");
        const metricsTx = await alignment.updateAlignmentMetrics(owner.address, ownerMetrics);
        await metricsTx.wait();
        console.log("Owner alignment metrics updated");

        // Verify owner alignment
        console.log("\nVerifying owner alignment...");
        const isAligned = await alignment.verifyAlignment(owner.address);
        console.log("Owner alignment status:", isAligned ? "Aligned" : "Not aligned");

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