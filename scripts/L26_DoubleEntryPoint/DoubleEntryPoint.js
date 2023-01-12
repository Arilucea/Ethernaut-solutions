const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];

    const duobleEntryAddress = addresses[scriptName];
    const doubleEntryContract = await ethers.getContractAt("IDoubleEntryPoinrt", duobleEntryAddress);

    const fortaAddress = await doubleEntryContract.forta();
    const vaultAddress = await doubleEntryContract.cryptoVault();

    const DetectionBot = await ethers.getContractFactory("DetectionBot");
    const detectionBot = await DetectionBot.deploy(vaultAddress);
    const detectionBotContract = await detectionBot.deployed();

    const fortaContract = await ethers.getContractAt("IForta", fortaAddress);

    const tx = await fortaContract.setDetectionBot(detectionBotContract.address);

    console.log('----------End----------', tx.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  