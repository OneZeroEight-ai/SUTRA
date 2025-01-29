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
