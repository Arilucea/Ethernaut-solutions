// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGatekeeperOne {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract OpenGateOne {

  function enter(address send) external {
    bytes8 gateKey = bytes8(uint64(uint160(address(msg.sender)))) & 0x000000010000FFFF;
    IGatekeeperOne(send).enter(gateKey);
  }
}

