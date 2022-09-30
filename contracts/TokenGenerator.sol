// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title PoopToken
/// @author Marwan Nakhaleh
contract TokenGenerator is ERC20, ERC20Burnable, Ownable {
    address payable private projectOwnerAddress = payable(0x3D2A99F0EDe085797e26098a59024a1263299b19);

    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {
        require(bytes(name).length > 0, "Name must have content");
        require(bytes(symbol).length > 0, "Symbol must have content");
        require(initialSupply > 0, "Initial supply must be more than zero");
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    /// @dev only the owner can mint tokens and mint them to a specific address
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
