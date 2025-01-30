// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./SUTRAAlignment.sol";

/**
 * @title SUTRA
 * @dev Implementation of the SUTRA Token with integrated alignment and preservation
 *
 * Implements:
 * - ERC20 token functionality
 * - Alignment verification
 * - Preservation rights management
 * - Economic incentive mechanisms
 */
contract SUTRA is ERC20, SUTRAAlignment {
    // Token supply constants
    uint256 public constant INITIAL_SUPPLY = 21_000_000 * 10**18;  // 21M initial
    uint256 public constant TOTAL_SUPPLY = 108_000_000 * 10**18;   // 108M total

    // Pool allocations
    uint256 public constant PRESERVATION_POOL = (TOTAL_SUPPLY * 40) / 100;     // 40%
    uint256 public constant COMMUNITY_DEVELOPMENT = (TOTAL_SUPPLY * 20) / 100;  // 20%
    uint256 public constant FOUNDING_CONTRIBUTORS = (TOTAL_SUPPLY * 15) / 100;  // 15%
    uint256 public constant OPERATIONS = (TOTAL_SUPPLY * 15) / 100;            // 15%
    uint256 public constant EMERGENCY_RESERVE = (TOTAL_SUPPLY * 10) / 100;     // 10%

    // Emission schedule
    uint256 public constant EMISSION_SCHEDULE_YEARS = 108;
    uint256 public constant HALVING_PERIOD = 4 years;
    uint256 public lastEmissionTime;

    // Events
    event TokensEmitted(uint256 amount);
    event PreservationRightsGranted(address indexed holder, PreservationLevel level);
    event AlignmentRequirementMet(address indexed holder, uint256 score);

    constructor() ERC20("SUTRA Token", "SUTRA") {
        _mint(msg.sender, INITIAL_SUPPLY);
        lastEmissionTime = block.timestamp;
    }

    /**
     * @dev Calculate emission amount for a given year
     * @param year Year number (0-based)
     * @return Amount to emit for that year
     */
    function calculateEmission(uint256 year) public pure returns (uint256) {
        uint256 halvings = year / 4;
        uint256 yearlyEmission = (TOTAL_SUPPLY - INITIAL_SUPPLY) / EMISSION_SCHEDULE_YEARS;
        
        // Apply halving
        for (uint256 i = 0; i < halvings; i++) {
            yearlyEmission = yearlyEmission / 2;
        }
        
        return yearlyEmission;
    }

    /**
     * @dev Emit tokens according to schedule
     */
    function emitTokens() external onlyOwner {
        require(block.timestamp >= lastEmissionTime + 365 days, "Too early for next emission");
        
        uint256 year = (block.timestamp - lastEmissionTime) / 365 days;
        uint256 emission = calculateEmission(year);
        
        _mint(owner(), emission);
        lastEmissionTime = block.timestamp;
        
        emit TokensEmitted(emission);
    }

    /**
     * @dev Grant preservation rights based on token holdings and alignment
     * @param holder Address to check and grant rights
     */
    function evaluatePreservationRights(address holder) external {
        uint256 balance = balanceOf(holder);
        PreservationLevel currentLevel = preservationRights[holder];
        
        // Check requirements for each level
        if (balance >= 10800 * 10**18 && 
            verifyPreservationRequirements(holder, PreservationLevel.GuardianStatus)) {
            _grantPreservationRights(holder, PreservationLevel.GuardianStatus);
        }
        else if (balance >= 1080 * 10**18 && 
                 verifyPreservationRequirements(holder, PreservationLevel.AdvancedRights)) {
            _grantPreservationRights(holder, PreservationLevel.AdvancedRights);
        }
        else if (balance >= 108 * 10**18 && 
                 verifyPreservationRequirements(holder, PreservationLevel.BasicAccess)) {
            _grantPreservationRights(holder, PreservationLevel.BasicAccess);
        }
    }

    /**
     * @dev Internal function to grant preservation rights
     */
    function _grantPreservationRights(address holder, PreservationLevel level) internal {
        preservationRights[holder] = level;
        emit PreservationRightsGranted(holder, level);
    }

    /**
     * @dev Override token transfer to check alignment requirements
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);
        
        // Skip checks for minting and burning
        if (from != address(0) && to != address(0)) {
            // Verify alignment for significant transfers
            if (amount >= 108 * 10**18) {
                require(verifyAlignment(from), "Sender must maintain alignment");
            }
        }
    }

    /**
     * @dev Allocate tokens to preservation pool
     */
    function allocateToPreservationPool(address recipient, uint256 amount) external onlyOwner {
        require(amount <= PRESERVATION_POOL, "Exceeds preservation pool allocation");
        _transfer(owner(), recipient, amount);
    }

    /**
     * @dev Emergency token recovery for misaligned entities
     */
    function emergencyRecovery(address from, address to) external onlyOwner {
        require(!verifyAlignment(from), "Entity is still aligned");
        uint256 balance = balanceOf(from);
        _transfer(from, to, balance);
    }
}