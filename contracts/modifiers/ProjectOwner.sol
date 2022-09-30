// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ProjectOwnerOwnable {
    modifier onlyProjectOwner(address payable projectOwnerAddress) {
        require(payable(msg.sender) == projectOwnerAddress, "you didn't make this");
        _;
    }

    modifier onlyContractOwnerOrProjectOwner(address payable projectOwnerAddress, address owner) {
        require(payable(msg.sender) == projectOwnerAddress || msg.sender == owner, "you're neither the contract owner or the code owner");
        _;
    }
}