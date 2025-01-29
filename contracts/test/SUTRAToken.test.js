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
