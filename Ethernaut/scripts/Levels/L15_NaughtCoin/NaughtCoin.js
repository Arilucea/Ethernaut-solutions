const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const player = accounts[0];
    const approvedAccount = accounts[1];

    const erc20Address = addresses[scriptName];
    let erc20Contract = await ethers.getContractAt('IERC20', erc20Address);

    let balance = await erc20Contract.balanceOf(player.address);
    const txApprove = await erc20Contract.approve(approvedAccount.address, balance);

    erc20Contract = await erc20Contract.connect(approvedAccount);

    const txTransfer = await erc20Contract.transferFrom(player.address, approvedAccount.address, balance);

    console.log('----------End----------', txTransfer.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
  