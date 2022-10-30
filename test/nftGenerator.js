const { expect } = require("chai");

describe("NFTGenerator", function () {
  describe("The constructor can be called and basics work", function () {
    let nftGenerator;
    let NFTGenerator;

    let token;
    let Token;

    const validPaymentAmount = hre.ethers.utils.parseEther("0.03");
    const validPaymentAmountOverpay = hre.ethers.utils.parseEther("1");
    const invalidPaymentAmount = hre.ethers.utils.parseEther("0.02");

    beforeEach(async function () {
      Token = await hre.ethers.getContractFactory("TokenGenerator");
      token = await Token.deploy("PoopToken", "POOP", 1000000);
      NFTGenerator = await hre.ethers.getContractFactory("NFTGenerator");
    });

    it("Generate NFT happy path", async function () {
      nftGenerator = await NFTGenerator.deploy(
        token.address,
        "TurdNFT",
        "TURD",
        { value: validPaymentAmount }
      );

      expect(await nftGenerator.name()).to.equal("TurdNFT");
      expect(await nftGenerator.symbol()).to.equal("TURD");
    });

    it("Generate NFT overpay", async function () {
      nftGenerator = await NFTGenerator.deploy(
        token.address,
        "TurdNFT",
        "TURD",
        { value: validPaymentAmount }
      );

      expect(await nftGenerator.name()).to.equal("TurdNFT");
      expect(await nftGenerator.symbol()).to.equal("TURD");
    });

    it("Generate NFT invalid payment amount", async function () {
      await expect(
        NFTGenerator.deploy(token.address, "TurdNFT", "TURD", {
          value: invalidPaymentAmount,
        })
      ).to.be.revertedWith("Price must be equal to listing price");
    });
  });

  describe("Tokens can be minted properly", function () {
    let nftGenerator;
    let NFTGenerator;

    let token;
    let Token;

    let owner;
    let addr1;
    let addr2;
    let addr3;

    const validPaymentAmount = hre.ethers.utils.parseEther("0.03");

    beforeEach(async function () {
      [owner, addr1, addr2, addr3] = await hre.ethers.getSigners();
      Token = await hre.ethers.getContractFactory("TokenGenerator");
      token = await Token.deploy("PoopToken", "POOP", 1000000);
      NFTGenerator = await hre.ethers.getContractFactory("NFTGenerator");
      nftGenerator = await NFTGenerator.deploy(
        token.address,
        "TurdNFT",
        "TURD",
        { value: validPaymentAmount }
      );
      await nftGenerator.connect(owner).updateWhitelist(addr1.address, 1);
    });

    it("User can't mint an ERC 721 without a price set by owner", async function () {
      await expect(
        nftGenerator.connect(addr1).userWhitelistMint()
      ).to.be.revertedWith("Price needs to be set");
    });

    it("User can't mint an ERC 721 without approved tokens", async function () {
      await nftGenerator.connect(owner).setNFTPrice(100);
      await token.connect(owner).transfer(addr1.address, 1000);

      await expect(
        nftGenerator.connect(addr1).userWhitelistMint()
      ).to.be.revertedWith(
        "ERC20: insufficient allowance"
      );
    });

    it("User can mint an ERC 721 with more than enough approved tokens", async function () {
      await nftGenerator.connect(owner).setNFTPrice(100);

      await token.connect(owner).transfer(addr1.address, 1000);
      await token.connect(addr1).approve(nftGenerator.address, 1000);

      await nftGenerator.connect(addr1).userWhitelistMint();
      expect(await nftGenerator.connect(addr1).whitelistedAddresses(addr1.address)).to.equal(0);
    });

    it("User cannot double mint an ERC 721 if only approved for one", async function () {
        await nftGenerator.connect(owner).setNFTPrice(100);
  
        await token.connect(owner).transfer(addr1.address, 1000);
        await token.connect(addr1).approve(nftGenerator.address, 1000);
  
        await nftGenerator.connect(addr1).userWhitelistMint();
        expect(await nftGenerator.connect(addr1).whitelistedAddresses(addr1.address)).to.equal(0);

        await expect(nftGenerator.connect(addr1).userWhitelistMint()).to.be.revertedWith("user is not whitelisted");
        expect(await nftGenerator.connect(addr1).whitelistedAddresses(addr1.address)).to.equal(0);
      });

      it("User can mint an ERC 721 after being approved for more", async function () {
        await nftGenerator.connect(owner).setNFTPrice(100);
  
        await token.connect(owner).transfer(addr1.address, 1000);
        await token.connect(addr1).approve(nftGenerator.address, 1000);
  
        await nftGenerator.connect(addr1).userWhitelistMint();
        expect(await nftGenerator.connect(addr1).whitelistedAddresses(addr1.address)).to.equal(0);

        await nftGenerator.connect(owner).updateWhitelist(addr1.address, 5);
        await nftGenerator.connect(addr1).userWhitelistMint();
        expect(await nftGenerator.connect(addr1).whitelistedAddresses(addr1.address)).to.equal(4);
      });

    it("User can't mint an ERC 721 without enough approved tokens", async function () {
        await nftGenerator.connect(owner).setNFTPrice(100);
  
        await token.connect(owner).transfer(addr1.address, 1000);
        await token.connect(addr1).approve(nftGenerator.address, 10);
  
        await expect(
            nftGenerator.connect(addr1).userWhitelistMint()
          ).to.be.revertedWith(
            "ERC20: insufficient allowance"
          );
      });
  

    it("Non-whitelisted user can't mint an ERC 721, even with approved tokens", async function () {
        await nftGenerator.connect(owner).setNFTPrice(100);
        let allowance = await token.allowance(
          addr2.address,
          nftGenerator.address
        );
        await token.connect(owner).transfer(addr2.address, 1000);

        console.log(`the contract is allowed to spend ${allowance} POOP tokens before approval`);

        await token.connect(addr2).approve(nftGenerator.address, 1000);
        allowance = await token.allowance(addr1.address, nftGenerator.address);
        console.log(`the contract is allowed to spend ${allowance} POOP tokens after approval`);
  
        await expect(
          nftGenerator.connect(addr2).userWhitelistMint()
        ).to.be.revertedWith(
          "user is not whitelisted"
        );
      });
  });
});
