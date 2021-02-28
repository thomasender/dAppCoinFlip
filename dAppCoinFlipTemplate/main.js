var web3 = new Web3(Web3.givenProvider);
var contractInstance;
var contractAddress = "0x90B7eAFf346995dD0B758Cef3d4b4a4804Be75B6";

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(window.abi, contractAddress, {from: accounts[0]});
    });
    $("#deposit_button").click(deposit);
    $("#getBalance_button").click(getBalance);
    $("#placebet_button").click(placeBet);
    $("#withdraw_button").click(userWithdraw);

});

function deposit(){
  var depositAmount = parseInt($("#depositETH").val());
  contractInstance.methods.deposit().send({value: web3.utils.toWei(depositAmount.toString(), "ether")});
};

function getBalance(){
  contractInstance.methods.getContractBalance().call().then(function(bal){
    $("#showcontract_balance").text(bal);
  })
};

function placeBet(){
  let tailsValue = $("#tails_input").val();
  let usersbet;
  let amount_bet = $("#amount_bet").val();
  if(tailsValue == 1){
    usersbet = true;
  }
  else{
    usersbet = false;
  }
  contractInstance.methods.placeBet(usersbet).send({value: web3.utils.toWei(amount_bet.toString(), "ether")}) //will send data and eth to placeBet
    .on("transactionHash", function(hash){ //event listener that listens for transactionHash
      console.log("tx hash");
    })
    .on("confirmation", function(confirmationNumber, receipt){ //listener for confirmationNumber only works on real blockchain as local will not confirm for real
        console.log("conf");

    })
    .on("receipt", function(receipt){
      console.log(receipt);
    })
  };

function userWithdraw(){
  contractInstance.methods.withdraw().send({from: contractAddress});
};
