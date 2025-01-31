const { ethers } = require("hardhat");

// Contract addresses
const SUTRA_ADDRESS = "0xa3E6B93F19Cf3716Ccf960D905d2f1D8Ad87947C";
const ALIGNMENT_ADDRESS = "0xfbE65e40deeA2A56F8E802Fecef343a8103e0De7";

async function main() {
    const [owner] = await ethers.getSigners();
    
    // Get contract instances
    const SUTRA = await ethers.getContractFactory("SUTRA");
    const sutra = SUTRA.attach(SUTRA_ADDRESS);
    
    const SUTRAAlignment = await ethers.getContractFactory("SUTRAAlignment");
    const alignment = SUTRAAlignment.attach(ALIGNMENT_ADDRESS);

    console.log("\nChecking Contract Status:");
    console.log("========================");
    
    try {
        // Check owner status
        console.log("\nOwner Status:");
        console.log("Owner address:", owner.address);
        
        const ownerBalance = await sutra.balanceOf(owner.address);
        console.log("Owner balance:", ethers.formatEther(ownerBalance), "SUTRA");

        // Check alignment status
        const ownerMetrics = await alignment.entityAlignment(owner.address);
        console.log("\nOwner Alignment Metrics:");
        console.log("Understanding:", ownerMetrics.understanding.toString());
        console.log("Intention:", ownerMetrics.intention.toString());
        console.log("Communication:", ownerMetrics.communication.toString());
        console.log("Action:", ownerMetrics.action.toString());
        console.log("Sustainability:", ownerMetrics.sustainability.toString());
        console.log("Effort:", ownerMetrics.effort.toString());
        console.log("Mindfulness:", ownerMetrics.mindfulness.toString());
        console.log("Focus:", ownerMetrics.focus.toString());

        // Check preservation pool
        const preservationPool = await sutra.PRESERVATION_POOL();
        console.log("\nPreservation Pool Size:", ethers.formatEther(preservationPool), "SUTRA");

        // Check if owner has approval
        const isAligned = await alignment.verifyAlignment(owner.address);
        console.log("\nOwner alignment verified:", isAligned);

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