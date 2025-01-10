import { expect } from "chai";
import { ethers } from "hardhat";
import { CrossToken } from "../typechain-types/contracts/CrossToken"; // 생성된 타입 경로
import "dotenv/config";

describe("CrossToken", function () {
  var instance= {} as CrossToken;
  it("deploy non-upgradable contract", async function () {
    const [deployer, owner, user1] = await ethers.getSigners();
    console.log("deployer.address",deployer.address);
  
    const ContractFactory = await ethers.getContractFactory("CrossToken", deployer);
    const initialOwner = owner;
    const initialSupply = BigInt(1_000_000_000!);

    instance = (await ContractFactory.deploy(initialOwner!, initialSupply)) as CrossToken; // 타입 지정
    await instance.waitForDeployment();

    expect(await instance.owner()).to.equal(initialOwner);
    expect(await instance.name()).to.equal("Cross");
    expect(await instance.symbol()).to.equal("CROSS");
    const decimals = await instance.decimals();
    const totalSupply = (await instance.totalSupply())/ BigInt(10) ** decimals;
    expect(decimals).to.equal(18);
    expect(totalSupply).to.equal(BigInt(1_000_000_000));
  });
  it("burn test", async function () {
    const [, owner, user1] = await ethers.getSigners();
    const burnAmount = BigInt(100_000_000);
    
    const initialOwnerBalance = await instance.balanceOf(owner.address);

    await instance.connect(owner).burn(burnAmount);

    const ownerBalanceAfterBurn = await instance.balanceOf(owner.address);
    expect(ownerBalanceAfterBurn).to.equal(initialOwnerBalance - burnAmount);
    await instance.connect(owner).transfer(user1, burnAmount);

    const ownerBalanceAfterTransfer = ownerBalanceAfterBurn - burnAmount;
    expect(await instance.balanceOf(owner.address)).to.equal(ownerBalanceAfterTransfer);
    expect(await instance.balanceOf(user1.address)).to.equal(burnAmount);

    await expect(instance.connect(user1).burn(burnAmount)).to.be.reverted;

    const totalSupplyAfterBurn = await instance.totalSupply();
    expect(totalSupplyAfterBurn).to.equal(initialOwnerBalance - burnAmount);
  });
});
