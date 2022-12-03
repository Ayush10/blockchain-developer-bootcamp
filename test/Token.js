const { ethers } = require("hardhat");
const { expect } = require("chai");

const tokens = (n) => ethers.utils.parseEther(n.toString(), "ether");

describe("Token", () => {
  // Tests go inside here
  let token, accounts, deployer, receiver;

  beforeEach(async () => {
    // Deploy the contract and Fetch Token from Blockchain
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy("Ayush Coin", "AYC", "520000000");
    await token.deployed();

    accounts = await ethers.getSigners();
    deployer = accounts[0];
    receiver = accounts[1];
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

  describe("Sending Tokens", () => {
    let amount, transaction, result;

    describe("Success", () => {
      beforeEach(async () => {
        amount = tokens(100);
        transaction = await token
          .connect(deployer)
          .transfer(accounts[1].address, amount);
        result = await transaction.wait();
      });

      it("Transfers token balances", async () => {
        // Log balance before transfer
        //   console.log(
        //     "deployer balance before transfer",
        //     await token.balancesOf(deployer.address)
        //   );
        //   console.log(
        //     "receiver balance before transfer",
        //     await token.balancesOf(receiver.address)
        //   );

        //Transfer tokens
        amount = tokens(100);

        // Ensure that tokens were transferred (balance changed)
        expect(await token.balancesOf(deployer.address)).to.equal(
          tokens(519999900).toString()
        );
        expect(await token.balancesOf(receiver.address)).to.equal(amount);

        // Log balance after transfer
        //   console.log(
        //     "deployer balance after transfer",
        //     await token.balancesOf(deployer.address)
        //   );
        //   console.log(
        //     "receiver balance after transfer",
        //     await token.balancesOf(receiver.address)
        //   );
      });

      it("Emits a Transfer event", async () => {
        // Check if event was emitted
        //   expect(transaction)
        //     .to.emit(token, "Transfer")
        //     .withArgs(deployer.address, receiver.address, amount);
        const event = result.events[0];
        expect(event.event).to.equal("Transfer");

        const args = event.args;
        expect(args._from).to.equal(deployer.address);
        expect(args._to).to.equal(receiver.address);
        expect(args._value).to.equal(amount);
      });
    });

    describe("Failure", () => {
      it("rejects insufficient balances", async () => {
        // Trasnfer more tokens than deployer has - 10 M
        const invalidAmount = tokens(10000000000);
        await expect(
          token.connect(deployer).transfer(receiver.address, invalidAmount)
        ).to.be.reverted;
      });

      it("rejects invalid recipients", async () => {
        await expect(
          token.connect(deployer).transfer(ethers.constants.AddressZero, amount)
        ).to.be.reverted;
      });
    });
  });
});
