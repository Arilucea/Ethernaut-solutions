const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------');

    const accounts = await ethers.getSigners();
    const sender = accounts[0];

    const alienCodexAddress = addresses[scriptName];

    const CodexSolver = await ethers.getContractFactory('CodexSolver');
    const codexSolver = await CodexSolver.deploy();
    const contract = await codexSolver.deployed();

    const txSolve = await contract.takeOwnership(alienCodexAddress);

    console.log('----------End----------', txSolve.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  

