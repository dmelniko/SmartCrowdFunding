pragma solidity ^0.5.2;

import './CrowdCoin.sol';
import 'github.com/OpenZeppelin/openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol';
import 'github.com/OpenZeppelin/openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol';


contract SCF {
    myCrowdSale public crowdSaleInstance;
    CrowdCoin token = new CrowdCoin("CrowdCoin","CRC", 18);


    mapping(address => bool) public voted; //keeps track of who voted
    bool public voteStarted;
    uint public numAgree;
    uint public numDisagree;
    address voteOwner;
    uint public percentToWin;


    function createCrowdSale(uint rate) public{
        //creates instance of crowdsale with specified rate
        //rate is token per eth, ex: 10 = 10 tokens per 1 eth
        crowdSaleInstance=new myCrowdSale(rate, msg.sender, token );
        token.addMinter(address(crowdSaleInstance));
        token.renounceMinter();
    }

    function buyTokens() public payable{
        //buy specified number of tokens
        crowdSaleInstance.buyTokens.value(msg.value)(msg.sender);

    }

    function weiRaised() public view returns(uint) {
        return crowdSaleInstance.weiRaised();
    }

    function getMyBalance() public view returns(uint){

        return token.balanceOf(msg.sender);
    }

    function startVoting(uint percentToWin) public {
        require(token.balanceOf(msg.sender)>0, "Must be an investor");
        require(percentToWin>0 && percentToWin<100, "percent to win must be 1-99" );
        percentToWin=percentToWin;
        voteOwner=msg.sender;
        voteStarted=true;
    }

    //investors call this to vote with true if agree
    function vote(bool agree) public{
        require(token.balanceOf(msg.sender)>0, "Must be an investor");
        require(voteStarted, "voting must be started");
        require(!voted[msg.sender],"must not have voted before");
        voted[msg.sender]=true;
        if(agree){
            numAgree++;
        }
        else{
            numDisagree++;
        }

    }

    //return true if majority agreed on the vote
    function endVote() public returns (bool){
        require(msg.sender==voteOwner, "only vote owner can end vote");
        voteStarted=false;
        uint result = 100*(numAgree/numDisagree);
        if(result>percentToWin){
            return true; //if majority agreed
        }
        else{
            return false;
        }

    }
}

contract myCrowdSale is Crowdsale, MintedCrowdsale{
    constructor(
        uint256 rate,   // token default is 18 decimals, rate = tokens per 1 eth
        address payable wallet,
        CrowdCoin token

    )
    MintedCrowdsale()
    Crowdsale(rate, wallet, token)
    public
    payable
    {
        owner = msg.sender;
    }

    address owner;

    modifier onlyOwner {
        require(owner == msg.sender, "Only owner can call this function");
        _;
    }
}