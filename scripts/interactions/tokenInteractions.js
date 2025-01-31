const { ethers } = require("hardhat");

// Contract addresses from deployment
const SUTRA_ADDRESS = "0xa3E6B93F19Cf3716Ccf960D905d2f1D8Ad87947C";

async function main() {
    const [owner] = await ethers.getSigners();
    
    // Get SUTRA contract instance
    const SUTRA = await ethers.getContractFactory("SUTRA");
    const sutra = SUTRA.attach(SUTRA_ADDRESS);

    // Example interaction functions
    async function checkBalances() {
        const totalSupply = await sutra.TOTAL_SUPPLY();
        const initialSupply = await sutra.INITIAL_SUPPLY();
        const ownerBalance = await sutra.balanceOf(owner.address);

        console.log("\nSupply Information:");
        console.log("===================");
        console.log("Total Supply:", ethers.formatEther(totalSupply), "SUTRA");
        console.log("Initial Supply:", ethers.formatEther(initialSupply), "SUTRA");
        console.log("Owner Balance:", ethers.formatEther(ownerBalance), "SUTRA");
    }

    async function checkPoolAllocations() {
        const preservationPool = await sutra.PRESERVATION_POOL();
        const communityDev = await sutra.COMMUNITY_DEVELOPMENT();
        const foundingContrib = await sutra.FOUNDING_CONTRIBUTORS();
        const operations = await sutra.OPERATIONS();
        const emergencyReserve = await sutra.EMERGENCY_RESERVE();

        console.log("\nPool Allocations:");
        console.log("=================");
        console.log("Preservation Pool:", ethers.formatEther(preservationPool), "SUTRA");
        console.log("Community Development:", ethers.formatEther(communityDev), "SUTRA");
        console.log("Founding Contributors:", ethers.formatEther(foundingContrib), "SUTRA");
        console.log("Operations:", ethers.formatEther(operations), "SUTRA");
        console.log("Emergency Reserve:", ethers.formatEther(emergencyReserve), "SUTRA");
    }

    async function transferTokens(to, amount) {
        console.log(`\nTransferring ${amount} SUTRA to ${to}...`);
        const tx = await sutra.transfer(to, ethers.parseEther(amount.toString()));
        await tx.wait();
        console.log("Transfer successful");
    }

    // Run interactions
    try {
        await checkBalances();
        await checkPoolAllocations();
        // Example transfer (uncomment to use)
        // await transferTokens("RECIPIENT_ADDRESS", 100);
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