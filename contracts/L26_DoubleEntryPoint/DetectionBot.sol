// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface IDoubleEntryPoinrt {
    function forta() external view returns(address);
    function cryptoVault() external view returns(address);
}

interface IForta {
    function raiseAlert(address user) external;
    function setDetectionBot(address detectionBotAddress) external;
}

interface IDetectionBot {
    function handleTransaction(address user, bytes calldata msgData) external;
}

contract DetectionBot is IDetectionBot {

    address vaultAddress;

    constructor(address _vaultAddress) {
        vaultAddress = _vaultAddress;
    }

    function handleTransaction(address user, bytes calldata msgData) external {
        (,,address origSender) = abi.decode(msgData[4:], (address, uint256, address));
        if (origSender == vaultAddress) {
            IForta(msg.sender).raiseAlert(user);
        }
    }

}