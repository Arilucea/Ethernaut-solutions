const { ethers } = require('hardhat');
const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];
    console.log(sender.address)

    const gatekeeperOneAddress = addresses[scriptName];
    console.log(gatekeeperOneAddress);
    const gate = await ethers.getContractAt('IGatekeeperOne', gatekeeperOneAddress);

    const OpenGateOne = await ethers.getContractFactory('OpenGateOne');
    const openGateOne = await OpenGateOne.deploy();
    const contract = await openGateOne.deployed();

    const txOpenGate = await contract.enter(gatekeeperOneAddress, {gasLimit: 58246});
    
    console.log('----------End----------', txOpenGate.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  