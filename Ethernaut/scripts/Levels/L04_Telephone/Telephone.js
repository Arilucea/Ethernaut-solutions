const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];
    
    const telephoneAddress = addresses[scriptName];

    const TelephoneContract = await ethers.getContractFactory('ClaimTelephone');
    const telephoneContract = await TelephoneContract.deploy(telephoneAddress);

    const contract = await telephoneContract.deployed();

    const txClaimTelephone = await contract.claimTelephone(sender.address);

    console.log('----------End----------');
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  