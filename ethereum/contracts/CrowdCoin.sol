pragma solidity ^0.5.2;

import 'github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol';
import 'github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol';

/**
 * ERC20 token which is detailed and mintable
 */
contract CrowdCoin is ERC20, ERC20Detailed, ERC20Mintable {
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals
    )
        ERC20Mintable()
        ERC20Detailed(name, symbol, decimals)
        ERC20()
        public
    {}
}
