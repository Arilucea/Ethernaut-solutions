const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];

    const gatekeeperTwoAddress = addresses[scriptName];

    const GateKeyCalculator = await ethers.getContractFactory('GateKeyCalculator');
    const gateKeyCalculator = await GateKeyCalculator.deploy();
    const calculator = await gateKeyCalculator.deployed();

    // Calculate future contract address
    let senderNonce = await sender.getTransactionCount();
    let openGateTwoAddress = await ethers.utils.getContractAddress({from: sender.address, nonce: senderNonce});
    console.log(openGateTwoAddress)

    // Generate gate key using contract
    let gateKey = await calculator.getGateKey(openGateTwoAddress);
    console.log(gateKey);

    // Deploy new contract and open the gate (in constructor contract size == 0)
    const OpenGateTwo = await ethers.getContractFactory('OpenGateTwo');
    const openGateTwo = await OpenGateTwo.deploy(gatekeeperTwoAddress, gateKey);
    const contract = await openGateTwo.deployed();

    console.log('----------End----------');
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  