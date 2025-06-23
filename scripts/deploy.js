async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const candidateNames = ["Alice", "Bob", "Charlie"];
  const Voting = await ethers.getContractFactory("VinoVoting");
  const voting = await Voting.deploy(candidateNames);
  await voting.deployed();

  console.log("VoteChain deployed to:", voting.address);
}

main().catch(console.error);
