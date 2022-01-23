///npx ganache-cli --fork https://mainnet.infura.io/v3/f241986c0e2d4dd6a6412570b53d19d8 --unlock 0x503828976D22510aad0201ac7EC88293211D23Da
const { expect, use } = require("chai");
const { ethers } = require("hardhat");

const { solidity } = require("ethereum-waffle");
use(solidity);

describe("DeFi", () => {
  const INITIAL_AMOUNT = "100";
  let owner;
  let DAI_TokenContract, cDAI_TokenContract, DeFi_Instance;

  before(async function () {
    [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();

    console.log("owner account is ", owner.address);

    const DeFi = await ethers.getContractFactory("DeFiComp");
    DeFi_Instance = await DeFi.deploy();

    console.log("DeFi address is ", DeFi_Instance.address);

    DAI_TokenContract = await ethers.getContractAt("ERC20", DeFi_Instance.DAI());
    cDAI_TokenContract = await ethers.getContractAt("ERC20", DeFi_Instance.cDAI());

  });
  
  it("should receive send dai amount from big whale", async function () {
    const whale = await ethers.getSigner(
      "0x503828976D22510aad0201ac7EC88293211D23Da"
    );
    await DAI_TokenContract.connect(whale).transfer(
      owner.address,
      ethers.utils.parseUnits(INITIAL_AMOUNT)
    );
 
    expect(Number(await DAI_TokenContract.balanceOf(owner.address)))
    .to.be.greaterThan(0);
  });

  it("should send Dai to instance contract motherfocka", async function () {
    await DAI_TokenContract.connect(owner).transfer(
      DeFi_Instance.address,
      ethers.utils.parseUnits("5"));

    expect(Number(await DAI_TokenContract.balanceOf(DeFi_Instance.address)))
    .to.be.greaterThan(0);
  });

  it("should add Dai to compound motherfocka", async function () {
    await DeFi_Instance.connect(owner).addToCompound(
      ethers.utils.parseUnits("3"));

    expect(Number(await cDAI_TokenContract.balanceOf(DeFi_Instance.address)))
    .to.be.greaterThan(0);
  });
});