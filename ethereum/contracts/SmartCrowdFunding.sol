pragma solidity ^0.5.2;

import './CrowdCoin.sol';

import 'github.com/OpenZeppelin/openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol';
import 'github.com/OpenZeppelin/openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol';
import 'github.com/OpenZeppelin/openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol';
import 'github.com/OpenZeppelin/openzeppelin-solidity/contracts/crowdsale/distribution/PostDeliveryCrowdsale.sol';

contract SmartCrowdFunding is Crowdsale, TimedCrowdsale, MintedCrowdsale, PostDeliveryCrowdsale {
    constructor(
        uint256 rate,   // in TKNbits, 400 for
        address payable wallet,
        CrowdCoin token,
        uint256 openingTime,
        uint256 closingTime
    )
    MintedCrowdsale()
    TimedCrowdsale(openingTime, closingTime)
    PostDeliveryCrowdsale()
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

contract SmartCrowdFundingDeployer {
    constructor(
        uint256 rate,
        uint256 openingTime,
        uint256 closingTime
    )
    public
    payable
    {
        CrowdCoin token = new CrowdCoin("CrowdCoin","CRC", 18);
        Crowdsale SCF = new SmartCrowdFunding(rate, msg.sender, token, openingTime, closingTime);
        token.addMinter(address(SCF));
        token.renounceMinter();
    }
}