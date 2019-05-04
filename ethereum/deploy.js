// invoke the deployment with "node deployCrowdCoin.jswdCoin.js" from the ethereum directory

const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");


const abiCrowdCoin = require("../ethereum/build/SmartCrowdFundingABI.json");
const bytecodeCrowdCoin = require("../ethereum/build/SmartCrowdFundingBytecode.json");

// const compiledSCF = require("./build/SmartCrowdFunding.json");
// console.log(compiledSCF.interface);
// console.log("Copy this ABI into the ABI json variable in file SmartCrowdFunding.js");


const provider = new HDWalletProvider(
  "region lemon visual town meat stay clever noise april two betray aware",
  "https://rinkeby.infura.io/v3/80ef6acc135e44f9bb397db5707c1684"
);

const web3 = new Web3(provider);

const deployCrowdCoin = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);

  console.log("attempting to deployCrowdCoin from account", accounts[0]);

  const result = await new web3.eth.Contract(abiCrowdCoin)
    .deploy({ data: bytecodeCrowdCoin.object})
    .send({ gas: "6000000", from: accounts[0] });

  console.log("Crowd Funding Contract deployed to rinkeby at", result.options.address);
  console.log("Copy this contract address into the address variable in file SmartCRowdFunding.js");
};

deployCrowdCoin();

