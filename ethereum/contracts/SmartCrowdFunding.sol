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
    {}
}

contract SmartCrowdFundingDeployer {
    constructor()
    public
    {
        CrowdCoin token = new CrowdCoin("CrowdCoin","CRC", 18);
        Crowdsale SCF = new SmartCrowdFunding(100, msg.sender, token, now, now + 2629743);
        token.addMinter(address(SCF));
        token.renounceMinter();
    }
}
