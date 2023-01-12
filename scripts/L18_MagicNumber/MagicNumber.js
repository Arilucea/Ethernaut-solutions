const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];

    const magicNumAddress = addresses[scriptName];

    const DeployOpcodes = await ethers.getContractFactory('DeployOpcodes');
    const deployOpcodes = await DeployOpcodes.deploy();
    const contract = await deployOpcodes.deployed();

    const txSolve = await contract.deployAndSolve(magicNumAddress);

    console.log('----------End----------', txSolve.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  

