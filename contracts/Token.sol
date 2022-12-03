// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
    string public name; // = "Ayush Coin";
    string public symbol; // = "AYC";
    uint256 public decimal = 18;
    uint256 public totalSupply; //= 520000000 * 10 ** decimal; // 520 Million Supply

    // Track Balances
    mapping(address => uint256) public balancesOf;

    // Send Tokens

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply
    ) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply * 10 ** decimal;
        balancesOf[msg.sender] = totalSupply;
    }
}
