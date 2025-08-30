
export const SAMPLE_CONTRACT = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

// THIS IS A VULNERABLE CONTRACT - DO NOT USE IN PRODUCTION
contract SimpleToken is ERC20, Ownable {
    
    // Allows anyone to mint tokens
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    // Vulnerable to reentrancy
    function withdraw(uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed.");
        _burn(msg.sender, amount); // state change after external call
    }
    
    // Constructor
    constructor() ERC20("SimpleToken", "STK") {
        // Mint 1000 tokens to the creator
        _mint(msg.sender, 1000 * 10**decimals());
    }
}
`;
