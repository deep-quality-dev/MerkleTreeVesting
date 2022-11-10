import { ethers, run } from "hardhat";
import { NomicLabsHardhatPluginError } from "hardhat/plugins";
import { config } from "./config";

async function main() {
  const MerkleTreeVestingFactory = await ethers.getContractFactory(
    'MerkleTreeVesting'
  );
  const merkleTreeVesting = await MerkleTreeVestingFactory.deploy(
    config.start,
    config.cliff,
    config.duration,
    config.token,
    config.merkleRoot
  );

  await merkleTreeVesting.deployed();

  console.log(
    `MerkleTreeVesting was deployed to ${merkleTreeVesting.address}`
  );

  try {
    console.log('\n>>>>>>>>>>>> Verification >>>>>>>>>>>>\n');

    console.log('Verifying: ', merkleTreeVesting.address);
    await run('verify:verify', {
      address: merkleTreeVesting.address,
      constructorArguments: [config.start,
        config.cliff,
        config.duration,
        config.token,
        config.merkleRoot],
    });
  } catch (error) {
    if (
      error instanceof NomicLabsHardhatPluginError &&
      error.message.includes('Reason: Already Verified')
    ) {
      console.log('Already verified, skipping...');
    } else {
      console.error(error);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
