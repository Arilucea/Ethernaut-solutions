// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface IMagicNum {
    function setSolver(address _solver) external;
}

contract DeployOpcodes {

    address contractAddress;

    function deployAndSolve(address magicNum) external {
        assembly {
            let fp := mload(0x40)
            mstore(fp, shl(0x68, 0x69602A60805260206080F3600052600A6016F3))
            sstore(contractAddress.slot, create(0, fp, 0x13))
        }

        IMagicNum(magicNum).setSolver(contractAddress);
    }

}