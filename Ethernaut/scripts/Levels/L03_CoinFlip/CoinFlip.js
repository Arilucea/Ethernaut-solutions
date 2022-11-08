const path = require('path');
const addresses = require('../Addresses.json');

async function main() {
    const scriptName = path.basename(__filename, '.js');
    console.log('----------', scriptName, '----------')

    const accounts = await ethers.getSigners();
    const sender = accounts[0];

    const coinFlipAddress = addresses[scriptName];
    const coinFlip = await ethers.getContractAt('ICoinFlip', coinFlipAddress);

    const GuessContract = await ethers.getContractFactory('GuessCoinFlip');
    const guessContract = await GuessContract.deploy(coinFlipAddress);

    const contract = await guessContract.deployed();

    let latestBlock = (await ethers.provider.getBlock("latest")).number
    while(true) {
        currentBlock = (await ethers.provider.getBlock("latest")).number
        console.log('Waiting for new block')
        
        if (currentBlock != latestBlock) {
            console.log('New guess')
            try {
                await contract.attack({});
                latestBlock = currentBlock;
            } catch (e) {
                console.log('Tx error', e)
            }
        }       
        
        let consecutiveWins = await coinFlip.consecutiveWins();
        if (consecutiveWins >= 10) {
            break;
        }
    }

    const consecutiveWins = await coinFlip.consecutiveWins();
    console.log('Consecutives wins:', consecutiveWins.toString());
    console.log('----------End----------');
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})