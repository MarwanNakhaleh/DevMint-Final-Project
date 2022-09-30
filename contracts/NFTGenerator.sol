// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./TokenGenerator.sol";
import "./modifiers/ProjectOwner.sol";

contract NFTGenerator is ERC1155, Ownable, Pausable, ERC1155Burnable, ProjectOwnerOwnable {
    mapping(address => uint256) public whitelistedAddresses;
    mapping(uint256 => uint256) public tokenValidUntil;

    // token info
    uint256 public id1;
    string public name1;
    uint256 public supply1;
    uint256 public price1;

    uint256 public id2;
    string public name2;
    uint256 public supply2;
    uint256 public price2;

    uint256 public id3;
    string public name3;
    uint256 public supply3;
    uint256 public price3;

    IERC20 public token;

    uint256 listingPrice = 0.03 ether;

    address payable private projectOwnerAddress = payable(0x3D2A99F0EDe085797e26098a59024a1263299b19);

    modifier userHasEnoughTokens(uint256 price) {
        require(token.balanceOf(msg.sender) >= price, "User does not have enough tokens to buy");
        _;
    }

    constructor(
        uint256 _id1,
        string memory _name1,
        uint256 _supply1,
        uint256 _id2,
        string memory _name2,
        uint256 _supply2,
        uint256 _id3,
        string memory _name3,
        uint256 _supply3,
        IERC20 _token
    ) payable ERC1155("") {
        require(msg.value >= listingPrice, "Price must be equal to listing price");
        require(_id1 > 0, "ID must be nonzero");
        require(bytes(_name1).length > 0, "Name must have content");
        require(_supply1 > 1, "Supply must be more than one");

        id1 = _id1;
        name1 = _name1;
        supply1 = _supply1;
        //_mint(msg.sender, _id1, _supply1, "");

        if(_id2 > 0 && bytes(_name2).length != 0 && _supply2 > 0) {
            require(_id2 != id1, "second token ID must not be equal to the first token ID");
            require(keccak256(abi.encodePacked(_name1)) != keccak256(abi.encodePacked(_name2)), "second token name must not be equal to the first token name");
            id2 = _id2;
            name2 = _name2;
            supply2 = _supply2;
            //_mint(msg.sender, _id2, _supply2, "");
        }
        if(_id3 > 0 && bytes(_name3).length != 0 && _supply3 > 0) {
            require(_id3 != id2, "third token ID must not be equal to the second token ID");
            require(keccak256(abi.encodePacked(_name2)) != keccak256(abi.encodePacked(_name3)), "third token name must not be equal to the second token name");
            require(_id3 != id1, "third token ID must not be equal to the first token ID");
            require(keccak256(abi.encodePacked(_name3)) != keccak256(abi.encodePacked(_name1)), "third token name must not be equal to the first token name");
            id3 = _id3;
            name3 = _name3;
            supply3 = _supply3;
            //_mint(msg.sender, _id3, _supply3, "");
        }

        _token = token;
        projectOwnerAddress.transfer(msg.value);
    }

    function userMintToken(uint256 tokenId) external {
        if(tokenId == id1) {
            require(price1 > 0, "price has not been set yet for token ID 1");
            require(IERC20(token).allowance(address(this), msg.sender) >= price1, "user has now allowed contract to spend enough tokens to mint ERC 1155");
            IERC20(token).transferFrom(msg.sender, this.owner(), price1);
            _mint(msg.sender, id1, 1, "");
        } else if(tokenId == id2) {
            require(price2 > 0, "price has not been set yet for token ID");
            require(IERC20(token).allowance(address(this), msg.sender) >= price2, "user has now allowed contract to spend enough tokens to mint ERC 1155");
            IERC20(token).transferFrom(msg.sender, this.owner(), price2);
            _mint(msg.sender, id2, 1, "");
        } else if(tokenId == id3) {
            require(price2 > 0, "price has not been set yet for token ID");
            require(IERC20(token).allowance(address(this), msg.sender) >= price3, "user has now allowed contract to spend enough tokens to mint ERC 1155");
            IERC20(token).transferFrom(msg.sender, this.owner(), price3);
            _mint(msg.sender, id3, 1, "");
        }
    }

    function setProjectOwner(address addr) external onlyProjectOwner(projectOwnerAddress) {
        projectOwnerAddress = payable(addr);
    }

    function setListingPrice(uint256 _listingPrice) external onlyProjectOwner(projectOwnerAddress) {
        listingPrice = _listingPrice;
    }

    function setUri(string memory uri) external onlyOwner whenNotPaused {
        _setURI(uri);
    }

    function setValidUntil(uint256 _tokenId, uint256 numberOfDaysAfterToday) external onlyOwner whenNotPaused {
        tokenValidUntil[_tokenId] = block.timestamp + (numberOfDaysAfterToday * 1 days);
    }

    function isValid(uint256 _tokenId) external view returns (bool) {
        return block.timestamp < tokenValidUntil[_tokenId];
    }

    function pause() external onlyOwner whenNotPaused {
        _pause();
    }

    function unpause() external onlyOwner whenPaused {
        _unpause();
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        external
        onlyOwner
        whenNotPaused
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        external
        onlyOwner
        whenNotPaused
    {
        _mintBatch(to, ids, amounts, data);
    }

    function updateWhitelist(address _addr, uint256 amount) external onlyOwner whenNotPaused {
        whitelistedAddresses[_addr] = amount;
    }

    function whitelistMint(uint256 amount, uint256 tokenId, bytes memory data) external whenNotPaused {
        require(whitelistedAddresses[msg.sender] >= 0, "user is not whitelisted");
        require(whitelistedAddresses[msg.sender] >= amount, "user cannot mint that many tokens");
        whitelistedAddresses[msg.sender] -= amount;
        _mint(msg.sender, tokenId, amount, data);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
