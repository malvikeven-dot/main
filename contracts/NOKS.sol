// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title NOKS — Norwegian Krone Stablecoin (testnet)
/// @notice Mintable ERC-20 for Base Sepolia testing
contract NOKS is ERC20, Ownable {
    uint8 private constant _DECIMALS = 6;

    constructor() ERC20("Norwegian Krone Stablecoin", "NOKS") Ownable(msg.sender) {
        // Mint 1 000 000 NOKS to deployer on deploy
        _mint(msg.sender, 1_000_000 * 10 ** _DECIMALS);
    }

    function decimals() public pure override returns (uint8) {
        return _DECIMALS;
    }

    /// @notice Faucet — mint 1 000 NOKS to caller (testnet only)
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    /// @notice Owner can mint arbitrary amounts
    function ownerMint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
