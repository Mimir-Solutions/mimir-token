// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.4;

import "hardhat/console.sol";

import "./abstract/Divine.sol";

contract MimirToken is Divine {

    constructor () Divine() {
        console.log("MimirToken::constructor: Instantiating MimirToken");
        // _mint(_msgSender(), 50000 * 1**decimals()  );
        console.log("MimirToken::constructor: Instantiated MimirToken");
    }
}