const path = require('path');
const addresses = require('../Addresses.json')

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];
    
    const preservationAddress = addresses[scriptName];
    const preservationContract = await ethers.getContractAt("IPreservation", preservationAddress);

    const FakeTimeLibrary = await ethers.getContractFactory('FakeTimeLibrary');
    const fakeTimeLibrary = await FakeTimeLibrary.deploy();
    const contract = await fakeTimeLibrary.deployed();
    console.log(contract.address)

    const txReplaceTimeLibrary1 = await preservationContract.setFirstTime(contract.address);

    const txReplaceOwner = await preservationContract.setFirstTime(100, {gasLimit: 70000});

    console.log('----------End----------', txReplaceOwner.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
