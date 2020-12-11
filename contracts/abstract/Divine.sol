// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import "hardhat/console.sol";

import "../dependencies/holyzeppelin/contracts/token/ERC20/ERC20.sol";
import "../dependencies/holyzeppelin/contracts/access/Ownable.sol";
import "../dependencies/holyzeppelin/contracts/security/Context.sol";

/**
 * Intended to gather other abstract contracts and interfaces for Eris.
 */
abstract contract Divine is ERC20, Ownable {

    constructor () ERC20( "Mimir Solutions", "MIMIR" ) {
        console.log("Divine::constructor: Instantiating Divine");
        _mint(Context._msgSender(), 10000 * 1e18  );
        console.log("Divine::constructor: Instantiated Divine");
    }
}