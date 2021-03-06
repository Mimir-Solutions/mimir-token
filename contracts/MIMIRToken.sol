// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import "hardhat/console.sol";

import "./abstract/Divine.sol";

contract MimirToken is Divine {

    constructor () Divine() {
        console.log("MimirToken::constructor: Instantiating MimirToken");
        console.log("MimirToken::constructor: Instantiated MimirToken");
    }
}