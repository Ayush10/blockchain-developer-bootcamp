// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
    string public name = "Ayush Coin";
    string public symbol = "AYC";
    uint256 public decimal = 18;
    uint256 public totalSupply = 520000000 * 10 ** decimal; // 520 Million Supply

    constructor() {}
}
