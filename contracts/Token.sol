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

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

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

    // Send Tokens
    function transfer(
        address _to,
        uint256 _value
    ) public returns (bool success) {
        // Require that sender has enough tokens to spend
        require(balancesOf[msg.sender] >= _value);
        require(_to != address(0));

        // Deduct tokens from spender
        balancesOf[msg.sender] -= _value;
        //Credit tokens to receiver
        balancesOf[_to] += _value;

        // Emit Transfer Event
        emit Transfer(msg.sender, _to, _value);

        return true;
    }
}
