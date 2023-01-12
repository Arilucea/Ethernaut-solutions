// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IElevator {
    function floor() external returns(uint);
    function goTo(uint _floor) external;
}

interface IBuilding {
  function isLastFloor(uint) external returns (bool);
}

contract Building is IBuilding {

    function goToFloor(uint _floor, address elevator) external {
        IElevator(elevator).goTo(_floor);
    }

    function isLastFloor(uint _floor) external override returns(bool) {
        if(IElevator(msg.sender).floor() == _floor) {
            return true;
        } else {
            return false;
        }
    }

}