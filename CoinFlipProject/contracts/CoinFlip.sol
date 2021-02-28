pragma solidity 0.5.16;

contract CoinFlip{

    address owner;
    uint contractBalance = 0;
    string result;

    constructor() public payable{
        owner = msg.sender;
    }


    event CoinFlipped(string);

    function deposit() public payable{
        require(msg.sender == owner, "Only owner can send money to contract!");

        contractBalance += msg.value;
    }

    function getContractBalance() public view returns(uint){
      return contractBalance;
    }

    function withdraw() public payable returns(uint){
      require(msg.sender == owner, "Only owner can withdraw!");
      msg.sender.transfer(address(this).balance);
      contractBalance = 0;
      return contractBalance;
    }

    function placeBet(bool _bet) public payable returns(string memory){
      require(msg.value <= contractBalance/2, "Insufficient contract Balance to pay potential wins! Bet Lower!");
      require(contractBalance >= msg.value*2, "Insufficient funds in contract to pay out possible win. Please bet lower!");
      uint flip = random();
      if (_bet == true && flip == 1){
        contractBalance -= msg.value * 2;
        msg.sender.transfer(msg.value * 2);
        result = "You WIN!";
        emit CoinFlipped(result);
      }
      else if(_bet == false && flip == 0){
        contractBalance -= msg.value * 2;
        msg.sender.transfer(msg.value * 2);
        result = "You WIN!";
        emit CoinFlipped(result);
      }
      else{
        contractBalance += msg.value;
        result = "You LOOSE! Try Again!";
        emit CoinFlipped(result);
      }
        return result;
    }

    function random() private returns(uint){
      return block.timestamp % 2;
    }

}
