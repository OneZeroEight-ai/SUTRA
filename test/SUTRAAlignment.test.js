const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SUTRAAlignment", function () {
  let SUTRAAlignment;
  let alignment;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    SUTRAAlignment = await ethers.getContractFactory("SUTRAAlignment");
    [owner, addr1, addr2] = await ethers.getSigners();
    alignment = await SUTRAAlignment.deploy();
  });

  describe("Core Alignment Mechanics", function () {
    it("Should calculate total alignment score correctly", async function () {
      const metrics = {
        understanding: 90,
        intention: 85,
        communication: 95,
        action: 88,
        sustainability: 92,
        effort: 87,
        mindfulness: 91,
        focus: 89
      };

      const expectedScore = (90 + 85 + 95 + 88 + 92 + 87 + 91 + 89) / 8;
      const score = await alignment.calculateTotalScore(metrics);
      expect(score).to.equal(expectedScore);
    });

    it("Should enforce minimum alignment thresholds", async function () {
      const lowMetrics = {
        understanding: 60,
        intention: 65,
        communication: 70,
        action: 68,
        sustainability: 62,
        effort: 67,
        mindfulness: 61,
        focus: 69
      };

      await alignment.updateAlignmentMetrics(addr1.address, lowMetrics);
      const verified = await alignment.verifyAlignment(addr1.address);
      expect(verified).to.be.false;
    });
  });

  describe("Preservation Rights Management", function () {
    it("Should enforce Basic Access requirements", async function () {
      const basicMetrics = {
        understanding: 75,
        intention: 75,
        communication: 75,
        action: 75,
        sustainability: 75,
        effort: 75,
        mindfulness: 75,
        focus: 75
      };

      await alignment.updateAlignmentMetrics(addr1.address, basicMetrics);
      const meetsRequirements = await alignment.verifyPreservationRequirements(
        addr1.address,
        1 // BasicAccess level
      );
      expect(meetsRequirements).to.be.true;
    });

    it("Should enforce Guardian Status requirements", async function () {
      const guardianMetrics = {
        understanding: 95,
        intention: 95,
        communication: 95,
        action: 95,
        sustainability: 95,
        effort: 95,
        mindfulness: 95,
        focus: 95
      };

      await alignment.updateAlignmentMetrics(addr1.address, guardianMetrics);
      const meetsRequirements = await alignment.verifyPreservationRequirements(
        addr1.address,
        3 // GuardianStatus level
      );
      expect(meetsRequirements).to.be.true;
    });
  });

  describe("Noble Eightfold Path Verification", function () {
    it("Should verify Right Understanding", async function () {
      const metrics = {
        understanding: 95,
        intention: 85,
        communication: 85,
        action: 85,
        sustainability: 85,
        effort: 85,
        mindfulness: 85,
        focus: 85
      };

      await alignment.updateAlignmentMetrics(addr1.address, metrics);
      const score = await alignment.calculateTotalScore(metrics);
      expect(score).to.be.above(75);
    });

    // Tests for each path component
    // Right Intention, Right Speech, Right Action, etc.
  });

  describe("Economic Incentive Alignment", function () {
    it("Should tie preservation rights to alignment scores", async function () {
      const highMetrics = {
        understanding: 95,
        intention: 95,
        communication: 95,
        action: 95,
        sustainability: 95,
        effort: 95,
        mindfulness: 95,
        focus: 95
      };

      await alignment.updateAlignmentMetrics(addr1.address, highMetrics);
      await alignment.updatePreservationLevel(addr1.address, 3); // GuardianStatus
      const level = await alignment.preservationRights(addr1.address);
      expect(level).to.equal(3);
    });
  });

  describe("Emergency Scenarios", function () {
    it("Should handle misalignment gracefully", async function () {
      const lowMetrics = {
        understanding: 60,
        intention: 60,
        communication: 60,
        action: 60,
        sustainability: 60,
        effort: 60,
        mindfulness: 60,
        focus: 60
      };

      await alignment.updateAlignmentMetrics(addr1.address, lowMetrics);
      await expect(
        alignment.updatePreservationLevel(addr1.address, 3)
      ).to.be.revertedWith("Requirements not met");
    });
  });
});