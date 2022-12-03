const { ethers } = require("hardhat");
const { expect } = require("chai");

const tokens = (n) => ethers.utils.parseEther(n.toString(), "ether");

describe("Token", () => {
  // Tests go inside here
  let token;

  beforeEach(async () => {
    // Deploy the contract and Fetch Token from Blockchain
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy();
    await token.deployed();
  });

  describe("Deployment", () => {
    const name = "Ayush Coin";
    const symbol = "AYC";
    const decimals = 18;
    const totalSupply = tokens(520000000).toString();

    it("has correct name", async () => {
      // Read token name
      //   const name = await token.name();
      // Check if name is correct
      //   expect(name).to.equal("Ayush Coin");
      expect(await token.name()).to.equal(name);
    });

    it("has correct symbol", async () => {
      expect(await token.symbol()).to.equal(symbol);
    });

    it("has correct decimals", async () => {
      expect(await token.decimal()).to.equal(decimals);
    });

    it("has correct total supply", async () => {
      //   const value = tokens("520000000");
      //   const value = ethers.utils.parseEther(totalSupply, ethers);
      expect(await token.totalSupply()).to.equal(totalSupply);
    });
  });
});
