const { ethers } = require('hardhat');
const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];
    console.log(sender.address)

    const gatekeeperThreeAddress = addresses[scriptName];

    const OpenGateThree = await ethers.getContractFactory('OpenGateThree');
    const openGateThree = await OpenGateThree.deploy();
    const contract = await openGateThree.deployed();

    const txOpenGate = await contract.openGateThree(gatekeeperThreeAddress, {value: 1100000000000000});
    
    console.log('----------End----------', txOpenGate.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  