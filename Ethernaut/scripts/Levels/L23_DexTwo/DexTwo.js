const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];

    const dexAddress = addresses[scriptName];

    const TokenSwapDex2 = await ethers.getContractFactory('TokenSwapDex2');
    const tokenSwapDex2 = await TokenSwapDex2.deploy(dexAddress);
    const contract = await tokenSwapDex2.deployed();

    const txSolve = await contract.SwapTokens();

    console.log('----------End----------', txSolve.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  

