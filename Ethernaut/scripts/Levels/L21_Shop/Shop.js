const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];

    const denialAddress = addresses[scriptName];

    const VariablePrice = await ethers.getContractFactory('VariablePrice');
    const variablePrice = await VariablePrice.deploy(denialAddress);
    const contract = await variablePrice.deployed();

    const txSolve = await contract.BuyItem()

    console.log('----------End----------', txSolve.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  

