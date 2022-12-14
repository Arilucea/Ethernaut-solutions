// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface IShop {
  function isSold() external view returns(bool);
  function buy() external;
}

contract VariablePrice {

    address shop;

    constructor(address _shop) {
        shop = _shop;
    }

    function BuyItem() external {
        IShop(shop).buy();
    }

    function price() external view returns(uint) {
        if (IShop(shop).isSold() == false) {
            return 1000;
        } else {
            return 0;
        }
    }

}