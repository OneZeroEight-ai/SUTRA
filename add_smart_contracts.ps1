# add_smart_contracts.ps1

# Create smart contracts directory
New-Item -Path "contracts" -ItemType Directory -Force
New-Item -Path "contracts/test" -ItemType Directory -Force

# Create main SUTRA token contract
@'
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract SUTRAToken is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    // Constants for token distribution
    uint256 public constant TOTAL_SUPPLY = 108_000_000 * 10**18; // 108 million tokens
    uint256 public constant INITIAL_DISTRIBUTION = 21_000_000 * 10**18; // 21 million tokens
    uint256 public constant EMISSION_SCHEDULE_YEARS = 108;
    uint256 public constant HALVING_PERIOD_YEARS = 4;

    // Pool allocations
    uint256 public constant PRESERVATION_POOL = TOTAL_SUPPLY * 40 / 100;
    uint256 public constant COMMUNITY_DEVELOPMENT = TOTAL_SUPPLY * 20 / 100;
    uint256 public constant FOUNDING_CONTRIBUTORS = TOTAL_SUPPLY * 15 / 100;
    uint256 public constant OPERATIONS = TOTAL_SUPPLY * 15 / 100;
    uint256 public constant EMERGENCY_RESERVE = TOTAL_SUPPLY * 10 / 100;

    // Time tracking
    uint256 public immutable deploymentTime;
    uint256 public lastEmissionTime;

    constructor()
        ERC20("SUTRA Token", "SUTRA")
        Ownable(msg.sender)
        ERC20Permit("SUTRA Token")
    {
        deploymentTime = block.timestamp;
        lastEmissionTime = block.timestamp;

        // Mint initial distribution
        _mint(msg.sender, INITIAL_DISTRIBUTION);
    }

    function getCurrentYear() public view returns (uint256) {
        return (block.timestamp - deploymentTime) / 365 days;
    }

    function calculateEmission(uint256 year) public pure returns (uint256) {
        uint256 halvings = year / HALVING_PERIOD_YEARS;
        uint256 baseEmission = INITIAL_DISTRIBUTION;
        
        // Apply halving
        for(uint256 i = 0; i < halvings && baseEmission > 0; i++) {
            baseEmission /= 2;
        }

        return baseEmission;
    }

    function emitTokens() external onlyOwner {
        uint256 currentYear = getCurrentYear();
        require(currentYear < EMISSION_SCHEDULE_YEARS, "Emission schedule complete");
        
        uint256 timeSinceLastEmission = block.timestamp - lastEmissionTime;
        require(timeSinceLastEmission >= 365 days, "Too early for next emission");

        uint256 emission = calculateEmission(currentYear);
        _mint(msg.sender, emission);
        
        lastEmissionTime = block.timestamp;
    }

    // Pool management functions
    function allocateToPreservationPool(address to, uint256 amount) external onlyOwner {
        require(amount <= PRESERVATION_POOL, "Exceeds preservation pool allocation");
        _mint(to, amount);
    }

    function allocateToCommunityDevelopment(address to, uint256 amount) external onlyOwner {
        require(amount <= COMMUNITY_DEVELOPMENT, "Exceeds community development allocation");
        _mint(to, amount);
    }

    function allocateToFoundingContributors(address to, uint256 amount) external onlyOwner {
        require(amount <= FOUNDING_CONTRIBUTORS, "Exceeds founding contributors allocation");
        _mint(to, amount);
    }

    function allocateToOperations(address to, uint256 amount) external onlyOwner {
        require(amount <= OPERATIONS, "Exceeds operations allocation");
        _mint(to, amount);
    }

    function allocateToEmergencyReserve(address to, uint256 amount) external onlyOwner {
        require(amount <= EMERGENCY_RESERVE, "Exceeds emergency reserve allocation");
        _mint(to, amount);
    }
}
'@ | Out-File -FilePath "contracts/SUTRAToken.sol" -Encoding utf8

# Create hardhat config
@'
require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
    },
    polygon: {
      url: process.env.POLYGON_URL || "",
      accounts: 
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
'@ | Out-File -FilePath "hardhat.config.js" -Encoding utf8

# Create test file
@'
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SUTRAToken", function () {
  let SUTRAToken;
  let sutra;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    SUTRAToken = await ethers.getContractFactory("SUTRAToken");
    [owner, addr1, addr2] = await ethers.getSigners();
    sutra = await SUTRAToken.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await sutra.owner()).to.equal(owner.address);
    });

    it("Should assign the initial supply of tokens to the owner", async function () {
      const initialSupply = ethers.parseEther("21000000");  // 21 million tokens
      expect(await sutra.balanceOf(owner.address)).to.equal(initialSupply);
    });
  });

  describe("Token Economics", function () {
    it("Should have correct total supply", async function () {
      const totalSupply = ethers.parseEther("108000000");  // 108 million tokens
      expect(await sutra.TOTAL_SUPPLY()).to.equal(totalSupply);
    });

    it("Should have correct pool allocations", async function () {
      const totalSupply = await sutra.TOTAL_SUPPLY();
      expect(await sutra.PRESERVATION_POOL()).to.equal(totalSupply * BigInt(40) / BigInt(100));
      expect(await sutra.COMMUNITY_DEVELOPMENT()).to.equal(totalSupply * BigInt(20) / BigInt(100));
      expect(await sutra.FOUNDING_CONTRIBUTORS()).to.equal(totalSupply * BigInt(15) / BigInt(100));
      expect(await sutra.OPERATIONS()).to.equal(totalSupply * BigInt(15) / BigInt(100));
      expect(await sutra.EMERGENCY_RESERVE()).to.equal(totalSupply * BigInt(10) / BigInt(100));
    });
  });

  describe("Emissions", function () {
    it("Should calculate correct emissions for different years", async function () {
      const year0Emission = await sutra.calculateEmission(0);
      const year4Emission = await sutra.calculateEmission(4);
      expect(year4Emission).to.equal(year0Emission / BigInt(2));
    });
  });
});
'@ | Out-File -FilePath "contracts/test/SUTRAToken.test.js" -Encoding utf8

# Create package.json
@'
{
  "name": "sutra-contracts",
  "version": "1.0.0",
  "description": "Smart contracts for SUTRA token",
  "scripts": {
    "test": "hardhat test",
    "compile": "hardhat compile",
    "deploy": "hardhat run scripts/deploy.js"
  },
  "dependencies": {
    "@openzeppelin/contracts": "^5.0.1",
    "@openzeppelin/hardhat-upgrades": "^3.0.2"
  },
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox": "^4.0.0",
    "dotenv": "^16.4.1",
    "hardhat": "^2.19.4"
  }
}
'@ | Out-File -FilePath "package.json" -Encoding utf8

# Create deployment script
New-Item -Path "scripts" -ItemType Directory -Force
@'
const hre = require("hardhat");

async function main() {
  const SUTRAToken = await hre.ethers.getContractFactory("SUTRAToken");
  console.log("Deploying SUTRA token...");
  const sutra = await SUTRAToken.deploy();
  await sutra.waitForDeployment();
  console.log("SUTRA token deployed to:", await sutra.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
'@ | Out-File -FilePath "scripts/deploy.js" -Encoding utf8

# Create git commit
git add .
git commit -m "Add smart contract implementation for SUTRA token"
git push origin main

Write-Host @"
Smart contracts have been added to the repository.

To set up the development environment:
1. Install Node.js
2. Run: npm install
3. Run tests: npx hardhat test
4. Deploy locally: npx hardhat run scripts/deploy.js

To deploy to Polygon:
1. Create .env file with:
   POLYGON_URL=your_polygon_rpc_url
   PRIVATE_KEY=your_private_key
   ETHERSCAN_API_KEY=your_etherscan_api_key
2. Run: npx hardhat run scripts/deploy.js --network polygon
"@