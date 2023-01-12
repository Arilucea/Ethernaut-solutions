// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SelfDestruct {

    address owner;

    constructor() {
        owner = msg.sender;
    }

    function destruction(address payable destination) external {
        require(msg.sender == owner, "Not the owner of the contract");
        selfdestruct(destination);
    }

    receive() external payable {}
}