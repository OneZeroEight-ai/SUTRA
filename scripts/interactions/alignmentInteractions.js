const { ethers } = require("hardhat");

// Contract addresses from deployment
const SUTRA_ADDRESS = "0xa3E6B93F19Cf3716Ccf960D905d2f1D8Ad87947C";
const ALIGNMENT_ADDRESS = "0xfbE65e40deeA2A56F8E802Fecef343a8103e0De7";

async function main() {
    const [owner] = await ethers.getSigners();
    
    // Get contract instances
    const SUTRAAlignment = await ethers.getContractFactory("SUTRAAlignment");
    const alignment = SUTRAAlignment.attach(ALIGNMENT_ADDRESS);

    const SUTRA = await ethers.getContractFactory("SUTRA");
    const sutra = SUTRA.attach(SUTRA_ADDRESS);

    // Example interaction functions
    async function updateAlignmentMetrics(address, metrics) {
        console.log(`Updating alignment metrics for ${address}...`);
        const tx = await alignment.updateAlignmentMetrics(address, metrics);
        await tx.wait();
        console.log("Metrics updated successfully");
    }

    async function checkPreservationRights(address) {
        console.log(`Checking preservation rights for ${address}...`);
        const rights = await alignment.preservationRights(address);
        const levels = ["None", "BasicAccess", "AdvancedRights", "GuardianStatus"];
        console.log(`Current preservation level: ${levels[rights]}`);
    }

    async function verifyAlignment(address) {
        console.log(`Verifying alignment for ${address}...`);
        const isAligned = await alignment.verifyAlignment(address);
        console.log(`Alignment status: ${isAligned ? "Aligned" : "Not aligned"}`);
    }

    // Example usage
    const exampleMetrics = {
        understanding: 85,
        intention: 90,
        communication: 88,
        action: 87,
        sustainability: 86,
        effort: 89,
        mindfulness: 85,
        focus: 88
    };

    // Run interactions
    try {
        await updateAlignmentMetrics(owner.address, exampleMetrics);
        await checkPreservationRights(owner.address);
        await verifyAlignment(owner.address);
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