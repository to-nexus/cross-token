import { ethers } from "hardhat";
import { CrossToken } from "../typechain-types/contracts/CrossToken"; // 생성된 타입 경로
import "dotenv/config";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("deployer.address",deployer.address);

  const ContractFactory = await ethers.getContractFactory("CrossToken", deployer);
  const initialOwner = process.env.INITIAL_OWNER_ADDRESS;
  const initialSupply = process.env.INITIAL_SUPPLY;
  
  console.log(
    "initialOwner", initialOwner,
    "initialSupply", initialSupply
  );

  const instance = (await ContractFactory.deploy(initialOwner!, BigInt(initialSupply!))) as CrossToken; // 타입 지정
  await instance.waitForDeployment();

  console.log(`Contract deployed to ${await instance.getAddress()}`);
  console.log("owner", await instance.owner())
  console.log("name", await instance.name())
  console.log("symbol", await instance.symbol())
  console.log("decimals", await instance.decimals());
  console.log("totalSupply", await instance.totalSupply());

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
