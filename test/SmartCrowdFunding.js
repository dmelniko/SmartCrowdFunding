const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledSmartCrowdFunding = require("../ethereum/build/SmartCrowdFunding.json");

let accounts;
let smartCrowdFunding;
// each "it" block will execute a clean slate deployment of the contract with automatic "beforeEach" invocation
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  // console.log(accounts);

  smartCrowdFunding = await new web3.eth.Contract(
      JSON.parse(compiledSmartCrowdFunding.interface)
  )
      .deploy({ data: compiledSmartCrowdFunding.bytecode })
      .send({ from: accounts[0], gas: "2000000" });
});

// The test suite is given in a DESCRIBE function calling multiple IT functions as tests

describe("Trojan Secret Contract", () => {
  it("contract can be deployed", () => {
    assert.ok(smartCrowdFunding.options.address);
  });
});