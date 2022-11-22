const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];

    const recoveryAddress = addresses[scriptName];

    // Calculate future contract address
    let recoveryNonce = await ethers.provider.getTransactionCount(recoveryAddress);
    let simpleTokenAddress = await ethers.utils.getContractAddress({from: recoveryAddress, nonce: recoveryNonce-1});
    console.log(simpleTokenAddress)

    const contract = await ethers.getContractAt('IRecovery', simpleTokenAddress);

    const txDestroy = await contract.destroy(sender.address);

    console.log('----------End----------', txDestroy.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  