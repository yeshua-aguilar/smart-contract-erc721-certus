const { ethers } = require("hardhat");

async function main() {
    const factory = await ethers.getContractFactory("SimpleNFT");
    const contract = await factory.deploy();
    await contract.deployed();
    console.log("SimpleNFT desplegado en:", contract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
