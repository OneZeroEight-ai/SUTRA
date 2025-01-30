const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SUTRA Token", function () {
  let SUTRA;
  let sutra;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    SUTRA = await ethers.getContractFactory("SUTRA");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    sutra = await SUTRA.deploy();
  });

  describe("Token Fundamentals", function () {
    it("Should set the right owner", async function () {
      expect(await sutra.owner()).to.equal(owner.address);
    });

    it("Should have correct initial supply", async function () {
      const initialSupply = ethers.parseEther("21000000");
      expect(await sutra.INITIAL_SUPPLY()).to.equal(initialSupply);
    });

    it("Should have correct total supply", async function () {
      const totalSupply = ethers.parseEther("108000000");
      expect(await sutra.TOTAL_SUPPLY()).to.equal(totalSupply);
    });
  });

  describe("Pool Allocations", function () {
    it("Should have correct preservation pool allocation", async function () {
      const totalSupply = await sutra.TOTAL_SUPPLY();
      expect(await sutra.PRESERVATION_POOL()).to.equal((totalSupply * BigInt(40)) / BigInt(100));
    });

    it("Should have correct community development allocation", async function () {
      const totalSupply = await sutra.TOTAL_SUPPLY();
      expect(await sutra.COMMUNITY_DEVELOPMENT()).to.equal((totalSupply * BigInt(20)) / BigInt(100));
    });

    it("Should verify all pool allocations sum to total supply", async function () {
      const preservationPool = await sutra.PRESERVATION_POOL();
      const communityDev = await sutra.COMMUNITY_DEVELOPMENT();
      const foundingContrib = await sutra.FOUNDING_CONTRIBUTORS();
      const operations = await sutra.OPERATIONS();
      const emergencyReserve = await sutra.EMERGENCY_RESERVE();

      const total = preservationPool + communityDev + foundingContrib + operations + emergencyReserve;
      expect(total).to.equal(await sutra.TOTAL_SUPPLY());
    });
  });

  describe("Emission Schedule", function () {
    it("Should calculate correct emissions for different years", async function () {
      const year0Emission = await sutra.calculateEmission(0);
      const year4Emission = await sutra.calculateEmission(4);
      const year8Emission = await sutra.calculateEmission(8);

      // Check halving
      expect(year4Emission).to.equal(year0Emission / BigInt(2));
      expect(year8Emission).to.equal(year4Emission / BigInt(2));
    });

    it("Should not allow emission before a year has passed", async function () {
      await expect(sutra.emitTokens())
        .to.be.revertedWith("Too early for next emission");
    });

    it("Should emit correct amount after a year", async function () {
      // Advance time by 1 year
      await ethers.provider.send("evm_increaseTime", [365 * 24 * 60 * 60]);
      await ethers.provider.send("evm_mine");

      const initialBalance = await sutra.balanceOf(owner.address);
      await sutra.emitTokens();
      const newBalance = await sutra.balanceOf(owner.address);
      
      expect(newBalance - initialBalance).to.equal(await sutra.calculateEmission(0));
    });
  });

  describe("Preservation Rights", function () {
    it("Should grant basic access with sufficient tokens and alignment", async function () {
      // Set up alignment metrics for basic access
      const metrics = {
        understanding: 75,
        intention: 75,
        communication: 75,
        action: 75,
        sustainability: 75,
        effort: 75,
        mindfulness: 75,
        focus: 75
      };

      await sutra.updateAlignmentMetrics(addr1.address, metrics);
      
      // Transfer required tokens
      const requiredTokens = ethers.parseEther("108");
      await sutra.transfer(addr1.address, requiredTokens);

      await sutra.evaluatePreservationRights(addr1.address);
      expect(await sutra.preservationRights(addr1.address)).to.equal(1); // BasicAccess
    });

    it("Should require both tokens and alignment for guardian status", async function () {
      // Set up high alignment metrics
      const metrics = {
        understanding: 95,
        intention: 95,
        communication: 95,
        action: 95,
        sustainability: 95,
        effort: 95,
        mindfulness: 95,
        focus: 95
      };

      await sutra.updateAlignmentMetrics(addr1.address, metrics);
      
      // Transfer almost enough tokens
      const almostEnough = ethers.parseEther("10799");
      await sutra.transfer(addr1.address, almostEnough);

      await sutra.evaluatePreservationRights(addr1.address);
      expect(await sutra.preservationRights(addr1.address)).to.not.equal(3); // Not GuardianStatus
    });
  });

  describe("Alignment Integration", function () {
    it("Should prevent large transfers without alignment", async function () {
      // Transfer significant amount without alignment
      const amount = ethers.parseEther("1000");
      await sutra.transfer(addr1.address, amount);

      await expect(
        sutra.connect(addr1).transfer(addr2.address, amount)
      ).to.be.revertedWith("Sender must maintain alignment");
    });

    it("Should allow large transfers with alignment", async function () {
      // Set up good alignment metrics
      const metrics = {
        understanding: 85,
        intention: 85,
        communication: 85,
        action: 85,
        sustainability: 85,
        effort: 85,
        mindfulness: 85,
        focus: 85
      };

      const amount = ethers.parseEther("1000");
      await sutra.transfer(addr1.address, amount);
      await sutra.updateAlignmentMetrics(addr1.address, metrics);

      await expect(
        sutra.connect(addr1).transfer(addr2.address, amount)
      ).to.not.be.reverted;
    });
  });

  describe("Emergency Mechanisms", function () {
    it("Should allow emergency recovery from misaligned entities", async function () {
      // Transfer tokens to addr1
      const amount = ethers.parseEther("1000");
      await sutra.transfer(addr1.address, amount);

      // Set up low alignment metrics
      const metrics = {
        understanding: 60,
        intention: 60,
        communication: 60,
        action: 60,
        sustainability: 60,
        effort: 60,
        mindfulness: 60,
        focus: 60
      };

      await sutra.updateAlignmentMetrics(addr1.address, metrics);

      // Emergency recovery should work
      await expect(
        sutra.emergencyRecovery(addr1.address, addr2.address)
      ).to.not.be.reverted;

      expect(await sutra.balanceOf(addr1.address)).to.equal(0);
      expect(await sutra.balanceOf(addr2.address)).to.equal(amount);
    });
  });
});