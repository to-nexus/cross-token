// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CrossToken is ERC20, ERC20Burnable, ERC20Permit, Ownable {
    constructor(address initialOwner, uint256 initialSupply)
        ERC20("Cross", "CROSS")
        Ownable(initialOwner)
        ERC20Permit("Cross")
    {
        _mint(initialOwner, initialSupply * 10 ** decimals());
    }

    function burn(uint256 value) public override onlyOwner {
        super.burn(value);
    }
}