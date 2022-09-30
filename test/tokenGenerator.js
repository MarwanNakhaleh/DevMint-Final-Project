const { expect } = require("chai");

describe("TokenGenerator", function () {
  describe("Create Token", function () {
    let token;
    let Token;

    beforeEach(async function () {
      Token = await hre.ethers.getContractFactory("TokenGenerator");
    });

    it("A token can be created", async function () {
      token = await Token.deploy("PoopToken", "POOP", 1000000);
    });

    it("A token has a custom name and symbol dynamically generated", async function () {
      token = await Token.deploy("PoopToken", "POOP", 1000000);
      expect(await token.symbol()).to.equal("POOP");
      expect(await token.name()).to.equal("PoopToken");
    });

    it("A token is not created when no name is provided", async function () {
      await expect(Token.deploy("", "POOP", 1000000)).to.be.revertedWith("Name must have content");
    });

    it("A token is not created when no symbol is provided", async function () {
      await expect(Token.deploy("PoopToken", "", 1000000)).to.be.revertedWith("Symbol must have content");
    });

    it("A token is not created when there is no initial supply", async function () {
      await expect(Token.deploy("PoopToken", "POOP", 0)).to.be.revertedWith("Initial supply must be more than zero");
    });
  });
});
