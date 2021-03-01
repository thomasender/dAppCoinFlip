pragma solidity 0.5.16;

contract CoinFlip{

    constructor() public payable{

    }

    uint public contractBalance;
    mapping (address => uint) balanceMap;
    uint userBet;
    string result;
    string message = "Hey there!";

    event CoinFlipped(string);

    function getMessage() public view returns(string memory){
      return message;
    }

    function deposit() public payable{
        balanceMap[msg.sender] += msg.value;
        contractBalance += msg.value;
    }

    function getBalance() public view returns(uint){
      return balanceMap[msg.sender];
    }

    function withdraw(uint _amount) public payable returns(uint){
      require(balanceMap[msg.sender] >= _amount);
      msg.sender.transfer(_amount);
      balanceMap[msg.sender] -= _amount;
      return balanceMap[msg.sender];
    }

    function placeBet(uint _amount, bool _bet) public payable returns(string memory){
      require(balanceMap[msg.sender] >= _amount, "Insufficient funds! Deposit more ETH!");
      require(contractBalance >= _amount*2, "Insufficient funds in contract to pay out possible win. Please bet lower!");
      uint flip = random();
      if (_bet == true && flip == 1){
        balanceMap[msg.sender] += balanceMap[msg.sender] + (_amount * 2);
        result = "You WIN!";
        emit CoinFlipped(result);
      }
      else if(_bet == false && flip == 0){
        balanceMap[msg.sender] += balanceMap[msg.sender] + (_amount * 2);
        result = "You WIN!";
        emit CoinFlipped(result);
      }
      else{
        balanceMap[msg.sender] -= _amount;
        result = "You LOOSE! Try Again!";
        emit CoinFlipped(result);
      }
        return result;
    }

    function random() private returns(uint){
      return block.timestamp % 2;
    }

}
