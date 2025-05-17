const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TestERC721", function () {
    let testERC721;
    let owner;
    let user;

    beforeEach(async function () {
        [owner, user] = await ethers.getSigners();
        const factory = await ethers.getContractFactory("TestERC721");
        testERC721 = await factory.deploy();
        await testERC721.waitForDeployment();
    });

    it("Debería tener el nombre y símbolo correctos", async function () {
        expect(await testERC721.name()).to.equal("TestERC721");
        expect(await testERC721.symbol()).to.equal("T721");
    });

    it("Debería crear un NFT cuando lo llama el propietario", async function () {
        const tokenURI = "https://example.com/tokenURI";
        await testERC721.mint(owner.address, tokenURI);
        expect(await testERC721.ownerOf(1)).to.equal(owner.address);
        expect(await testERC721.tokenURI(1)).to.equal(tokenURI);
    });

    it("Debería fallar al crear un NFT cuando lo llama una cuenta no autorizada", async function () {
        const tokenURI = "https://example.com/tokenURI";
        await expect(
            testERC721.connect(user).mint(user.address, tokenURI)
        ).to.be.revertedWithCustomError(testERC721, "OwnableUnauthorizedAccount");
    });

    it("Debería fallar al obtener el propietario de un NFT inexistente", async function () {
        await expect(testERC721.ownerOf(999)).to.be.reverted;
    });

    it("Debería fallar al obtener el URI de un NFT inexistente", async function () {
        await expect(testERC721.tokenURI(999)).to.be.reverted;
    });
});
