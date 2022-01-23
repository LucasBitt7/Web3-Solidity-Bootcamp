require("@nomiclabs/hardhat-waffle");
//npx ganache-cli --fork https://mainnet.infura.io/v3/f241986c0e2d4dd6a6412570b53d19d8
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


module.exports = {

  solidity: {
    compilers: [
      {
        version: "0.6.12"
      },
      {
        version: "0.8.0"
      },
    ]},
  networks: {
    fork: {
      url: "http://127.0.0.1:8545",
    },
  },
};
