// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface IPreservation {
    function setFirstTime(uint _timeStamp) external;
}

contract FakeTimeLibrary {
    // Same variables as Preservation to have the same storage distribution
    address public timeZone1Library;
    address public timeZone2Library;
    address public owner; 

  function setTime(uint _time) public {
        owner = msg.sender;
    }
}