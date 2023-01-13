const path = require('path');
const addresses = require('../Addresses.json')

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const elevatorAddress = addresses[scriptName];

    const Building = await ethers.getContractFactory('Building');
    const building = await Building.deploy();
    const contract = await building.deployed();

    const txGoToFloor = await contract.goToFloor(20, elevatorAddress);

    console.log('----------End----------', txGoToFloor.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
