const { expect } = require("chai");

describe("NFTGenerator", function () {
  describe("The constructor can be called", function () {
    let nftGenerator;
    let NFTGenerator;

    let token;
    let Token;

    const validPaymentAmount = hre.ethers.utils.parseEther("0.03");
    const validPaymentAmountOverpay = hre.ethers.utils.parseEther("1");
    const invalidPaymentAmount = hre.ethers.utils.parseEther("0.02");

    beforeEach(async function() {
        Token = await hre.ethers.getContractFactory("TokenGenerator");
        token = await Token.deploy("PoopToken", "POOP", 1000000);
        NFTGenerator = await hre.ethers.getContractFactory("NFTGenerator");
    });

    it("One token happy path", async function () {
        nftGenerator = await NFTGenerator.deploy(1, "POOP", 1000000, 0, "", 0, 0, "", 0, token.address, {value: validPaymentAmount});

        expect(await nftGenerator.id1()).to.equal(1);
        expect(await nftGenerator.name1()).to.equal("POOP");
        expect(await nftGenerator.supply1()).to.equal(1000000);
    });

    it("One token happy path overpay", async function () {
        nftGenerator = await NFTGenerator.deploy(1, "POOP", 1000000, 0, "", 0, 0, "", 0, token.address, {value: validPaymentAmountOverpay});

        expect(await nftGenerator.id1()).to.equal(1);
        expect(await nftGenerator.name1()).to.equal("POOP");
        expect(await nftGenerator.supply1()).to.equal(1000000);
    });

    it("One token invalid payment amount", async function () {
        await expect(NFTGenerator.deploy(1, "POOP", 1000000, 0, "", 0, 0, "", 0, token.address, {value: invalidPaymentAmount})).to.be.revertedWith("Price must be equal to listing price");
    });

    it("One token invalid supply", async function () {
        await expect(NFTGenerator.deploy(1, "POOP", 1, 0, "", 0, 0, "", 0, token.address, {value: validPaymentAmount})).to.be.revertedWith("Supply must be more than one");
    });

    it("One token invalid ID", async function () {
        await expect(NFTGenerator.deploy(0, "POOP", 1000000, 0, "", 0, 0, "", 0, token.address, {value: validPaymentAmount})).to.be.revertedWith("ID must be nonzero");
    });

    it("One token invalid name", async function () {
        await expect(NFTGenerator.deploy(1, "", 1000000, 0, "", 0, 0, "", 0, token.address, {value: validPaymentAmount})).to.be.revertedWith("Name must have content");
    });

    it("Two tokens happy path", async function () {
        nftGenerator = await NFTGenerator.deploy(1, "POOP", 1000000, 2, "BUTT", 500000, 0, "", 0, token.address, {value: validPaymentAmount});

        expect(await nftGenerator.id1()).to.equal(1);
        expect(await nftGenerator.name1()).to.equal("POOP");
        expect(await nftGenerator.supply1()).to.equal(1000000);

        expect(await nftGenerator.id2()).to.equal(2);
        expect(await nftGenerator.name2()).to.equal("BUTT");
        expect(await nftGenerator.supply2()).to.equal(500000);
    });

    it("Reject two tokens IDs that are same", async function () {
        await expect(NFTGenerator.deploy(1, "POOP", 1000000, 1, "BUTT", 500000, 0, "", 0, token.address, {value: validPaymentAmount})).to.be.revertedWith("second token ID must not be equal to the first token ID");
    });

    it("Reject two tokens names that are same", async function () {
        await expect(NFTGenerator.deploy(1, "POOP", 1000000, 2, "POOP", 500000, 0, "", 0, token.address, {value: validPaymentAmount})).to.be.revertedWith("second token name must not be equal to the first token name");
    });

    it("Three tokens happy path", async function () {
        nftGenerator = await NFTGenerator.deploy(1, "POOP", 1000000, 2, "BUTT", 500000, 3, "AZZ", 69420, token.address, {value: validPaymentAmount});

        expect(await nftGenerator.id1()).to.equal(1);
        expect(await nftGenerator.name1()).to.equal("POOP");
        expect(await nftGenerator.supply1()).to.equal(1000000);

        expect(await nftGenerator.id2()).to.equal(2);
        expect(await nftGenerator.name2()).to.equal("BUTT");
        expect(await nftGenerator.supply2()).to.equal(500000);

        expect(await nftGenerator.id3()).to.equal(3);
        expect(await nftGenerator.name3()).to.equal("AZZ");
        expect(await nftGenerator.supply3()).to.equal(69420);
    });

    it("Reject when third token name is same as first name", async function () {
        await expect(NFTGenerator.deploy(1, "POOP", 1000000, 2, "BUTT", 500000, 3, "POOP", 69420, token.address, {value: validPaymentAmount})).to.be.revertedWith("third token name must not be equal to the first token name");
    });

    it("Reject when third token name is same as second name", async function () {
        await expect(NFTGenerator.deploy(1, "POOP", 1000000, 2, "BUTT", 500000, 3, "BUTT", 69420, token.address, {value: validPaymentAmount})).to.be.revertedWith("third token name must not be equal to the second token name");
    });

    it("Reject when third token ID is same as first ID", async function () {
        await expect(NFTGenerator.deploy(1, "POOP", 1000000, 2, "BUTT", 500000, 1, "AZZ", 69420, token.address, {value: validPaymentAmount})).to.be.revertedWith("third token ID must not be equal to the first token ID");
    });

    it("Reject when third token ID is same as second ID", async function () {
        await expect(NFTGenerator.deploy(1, "POOP", 1000000, 2, "BUTT", 500000, 2, "AZZ", 69420, token.address, {value: validPaymentAmount})).to.be.revertedWith("third token ID must not be equal to the second token ID");
    });
  });
});
