const CoinFlip = artifacts.require("CoinFlip");
const truffleAssert = require("truffle-assertions");
contract("CoinFlip", async function(accounts){
  it("should allow owner to deposit ETH", async function(){
    let instance = await CoinFlip.deployed();
    await truffleAssert.passes(instance.deposit({value: web3.utils.toWei("2", "ether"), from: accounts[0]}), truffleAssert.ErrorType.REVERT);
  });
  it("shouldn't allow not owner to deposit ETH", async function(){
    let instance = await CoinFlip.deployed();
    await truffleAssert.fails(instance.deposit({value: web3.utils.toWei("1", "ether"), from: accounts[1]}), truffleAssert.ErrorType.REVERT);
  });
  it("should allow to query contract balance", async function(){
    let instance = await CoinFlip.deployed();
    await instance.getContractBalance();
    await truffleAssert.passes(instance.getContractBalance());
  });
  it("should allow to bet half of contract balance", async function(){
    let instance = await CoinFlip.deployed();
    await truffleAssert.passes(instance.placeBet({value: web3.utils.toWei("1", "ether")}), truffleAssert.ErrorType.REVERT);
  });
  it("should not allow non owner to withdraw contract balance", async function(){
    let instance = await CoinFlip.deployed();
    await instance.withdraw();
    await truffleAssert.fails(instance.withdraw({from: accounts[1]}));
  });
  it("should allow owner to withdraw contract balance", async function(){
    let instance = await CoinFlip.deployed();
    await instance.withdraw();
    await truffleAssert.passes(instance.withdraw({from: accounts[0]}));
  });
});
