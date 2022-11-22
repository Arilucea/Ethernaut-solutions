const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];

    falloutAddress = addresses[scriptName];
    const falloutContract = await ethers.getContractAt('IFallout', falloutAddress);

    const txContractClaim = await falloutContract.Fal1out({})

    console.log('----------End----------');
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  