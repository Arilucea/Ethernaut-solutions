const path = require('path');
const addresses = require('../Addresses.json')

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];
    
    const forceAddress = addresses[scriptName];

    const SelfDestruct = await ethers.getContractFactory('SelfDestruct');
    const selfDestruct = await SelfDestruct.deploy();
    const contract = await selfDestruct.deployed();

    const fundContract = await sender.sendTransaction({to: contract.address, value: 100});
    const txSelfDestruction = await contract.destruction(forceAddress);

    console.log('----------End----------', txSelfDestruction.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
