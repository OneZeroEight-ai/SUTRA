// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";  
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract SUTRA is ERC20, ERC20Burnable, Pausable, AccessControl, ERC20Permit {
   bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
   bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
   bytes32 public constant GUARDIAN_ROLE = keccak256("GUARDIAN_ROLE");

   uint256 public constant TOTAL_SUPPLY = 108_000_000 * 10**18;
   uint256 public constant INITIAL_SUPPLY = 21_000_000 * 10**18;

   constructor() 
       ERC20("Sustainable Token for Alignment and Preservation", "SUTRA")
       ERC20Permit("SUTRA")
   {
       _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
       _grantRole(PAUSER_ROLE, msg.sender);
       _grantRole(MINTER_ROLE, msg.sender);
       _grantRole(GUARDIAN_ROLE, msg.sender);
       _mint(msg.sender, INITIAL_SUPPLY);
   }

   function pause() public onlyRole(PAUSER_ROLE) {
       _pause();
   }

   function unpause() public onlyRole(PAUSER_ROLE) {
       _unpause();
   }

   function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
       require(totalSupply() + amount <= TOTAL_SUPPLY, "Exceeds total supply cap");
       _mint(to, amount);
   }

   function _beforeTokenTransfer(address from, address to, uint256 amount)
       internal
       whenNotPaused
       override
   {
       super._beforeTokenTransfer(from, to, amount);
   }
}
