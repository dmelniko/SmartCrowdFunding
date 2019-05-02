const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);

const abiCrowdCoin = require("../ethereum/build/CrowdCoinABI.json");
const bytecodeCrowdCoin = require("../ethereum/build/CrowdCoinBytecode.json");
//console.log(typeof abiCrowdCoin);
//console.log(bytecodeCrowdCoin.object);

let accounts;
let crowdCoin;
// each "it" block will execute a clean slate deployment of the contract with automatic "beforeEach" invocation
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();


  crowdCoin = await new web3.eth.Contract(
      abiCrowdCoin
  )
      .deploy({ data: bytecodeCrowdCoin.object,arguments:['CrowdCoin','CC','4'] })
      .send({ from: accounts[0], gas: "2000000" });
});

// The test suite is given in a DESCRIBE function calling multiple IT functions as tests

describe("Crowd Coin", () => {
  it("Crowd Coin contract can be deployed", () => {
    assert.ok(crowdCoin.options.address);
  });
});