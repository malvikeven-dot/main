// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title NOKS — Norwegian Krone Stablecoin (Malvik prototype, Base Sepolia)
/// @notice Open mint function — no access control. Prototype faucet only. Never use in production.
contract NOKS is ERC20 {
    constructor() ERC20("Norwegian Krone Stablecoin", "NOKS") {
        // Mint 1,000,000 NOKS to deployer as initial supply
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }

    /// @notice Anyone can mint — serves as a testnet faucet
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
