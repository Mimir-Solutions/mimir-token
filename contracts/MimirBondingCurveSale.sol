pragma solidity 0.6.12;

/**
 * SPDX-License-Identifier: GPL-3.0-or-later
 * Hegic
 * Copyright (C) 2020 Hegic Protocol
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import "./dependencies/holyzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "./dependencies/holyzeppelin/contracts/token/ERC20/IERC20.sol";
import "./dependencies/holyzeppelin/contracts/access/Ownable.sol";


/**
 * @author 0mllwntrmt3
 * @title Hegic Initial Offering
 * @notice some description
 */
contract MimirBondingCurveSale is Ownable {
    using SafeMath for uint;

    event Claimed(address indexed account, uint userShare, uint mimirAmount);
    event Received(address indexed account, uint amount);

    uint public immutable START;
    uint public immutable END;
    uint public immutable TOTAL_DISTRIBUTE_AMOUNT;
    uint public immutable MINIMAL_PROVIDE_AMOUNT = 600 ether;
    uint public totalProvided = 0;
    mapping(address => uint) public provided;
    IERC20 public immutable MIMIRTOKEN;
    SafeERC20 public immutable SAFEMIMIRTOKEN;

    constructor() public {}

    function setTokenForSale( IERC20 mimirToken_ ) public onlyOwner() {
        MIMIRTOKEN = mimirToken_;
        SAFEMIMIRTOKEN = mimirToken_;
        TOTAL_DISTRIBUTE_AMOUNT = mimirToken_.totalSupply();
    }

    function startSale() public onlyOwner() {
        START = block.timestamp;
        END = START + 3 days;
    }

    receive() external payable {
        require(START <= block.timestamp, "The offering has not started yet");
        require(block.timestamp <= END, "The offering has already ended");
        totalProvided += msg.value;
        provided[_msgSender()] += msg.value;
        emit Received(_msgSender(), msg.value);
    }

    function claim() external {
        require(block.timestamp > END);
        require(provided[_msgSender()] > 0);

        uint userShare = provided[_msgSender()];
        provided[_msgSender()] = 0;

        if(totalProvided >= MINIMAL_PROVIDE_AMOUNT) {
            uint mimirAmount = TOTAL_DISTRIBUTE_AMOUNT
                .mul(userShare)
                .div(totalProvided);
            MIMIRTOKEN.safeTransfer(_msgSender(), mimirAmount);
            emit Claimed(_msgSender(), userShare, mimirAmount);
        } else {
            _msgSender().transfer(userShare);
            emit Claimed(_msgSender(), userShare, 0);
        }
    }

    function withdrawProvidedETH() external onlyOwner {
        require(END < block.timestamp, "The offering must be completed");
        require(
            totalProvided >= MINIMAL_PROVIDE_AMOUNT,
            "The required amount has not been provided!"
        );
        payable(owner()).transfer(address(this).balance);
    }

    function withdrawMimir() external onlyOwner {
        require(END < block.timestamp, "The offering must be completed");
        require(
            totalProvided < MINIMAL_PROVIDE_AMOUNT,
            "The required amount has been provided!"
        );
        SAFEMIMIRTOKEN.safeTransfer(owner(), MIMIRTOKEN.balanceOf(address(this)));
    }

    function withdrawUnclaimedHEGIC() external onlyOwner {
        require(END + 30 days < block.timestamp, "Withdrawal unavailable yet");
        SAFEMIMIRTOKEN.safeTransfer(owner(), MIMIRTOKEN.balanceOf(address(this)));
    }
}
