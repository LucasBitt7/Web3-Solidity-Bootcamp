// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface Erc20 {
function approve(address, uint256) external returns (bool);
function transfer(address, uint256) external returns (bool);
}

interface CErc20 {
function mint(uint256) external returns (uint256);
function exchangeRateCurrent() external returns (uint256);
function supplyRatePerBlock() external returns (uint256);
function redeem(uint) external returns (uint);
function redeemUnderlying(uint) external returns (uint);
}

contract DeFiComp {
    address public constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address public constant cDAI = 0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643;
    CErc20 public CERC20;
    Erc20 public ERC20;

    constructor() public {
        CERC20 = CErc20(cDAI);
        ERC20 = Erc20(DAI);
    }

    function addToCompound(uint256 amount) public {
        ERC20.approve(cDAI, amount);
        CERC20.mint(amount);
    }

}