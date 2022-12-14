const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];

    const dexAddress = addresses[scriptName];

    const dexContract = await ethers.getContractAt("IDex", dexAddress);
    const token1 = await dexContract.token1()
    const token2 = await dexContract.token2()


    const TokenSwapDex = await ethers.getContractFactory('TokenSwapDex');
    const tokenSwapDex = await TokenSwapDex.deploy(dexAddress);
    const contract = await tokenSwapDex.deployed();

    const token1Contract = await ethers.getContractAt("ISwappableToken", token1);
    let tx = await token1Contract.transfer(contract.address, 10);

    const token2Contract = await ethers.getContractAt("ISwappableToken", token2);
    tx = await token2Contract.transfer(contract.address, 10);

    const txSolve = await contract.EmptyDex();

    console.log('----------End----------', txSolve.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  

