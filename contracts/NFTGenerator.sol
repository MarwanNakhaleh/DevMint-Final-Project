// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./TokenGenerator.sol";
import "./modifiers/ProjectOwner.sol";

contract NFTGenerator is ERC721, Ownable, Pausable, ERC721Burnable, ProjectOwnerOwnable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    mapping(address => uint256) public whitelistedAddresses;
    mapping(uint256 => uint256) public tokenValidUntil;

    IERC20 public token;

    uint256 public listingPrice = 0.03 ether;
    uint256 public nftPrice;

    address payable private projectOwnerAddress = payable(0x3D2A99F0EDe085797e26098a59024a1263299b19);
    address private contractOwner;

    string public baseUri = "https://www.google.com/";

    modifier userHasEnoughTokens(uint256 price) {
        require(token.balanceOf(msg.sender) >= price, "User does not have enough tokens to buy");
        _;
    }

    modifier approvedToSpendXTokens(uint numTokens) {
        require(token.allowance(msg.sender, address(this)) >= numTokens, "msg.sender is not approved to spend that many tokens!");
        _;
    }

    constructor(IERC20 _token, string memory _name, string memory _symbol) payable ERC721(_name, _symbol) {
        require(msg.value >= listingPrice, "Price must be equal to listing price");
        
        contractOwner = msg.sender;
        token = _token;
        projectOwnerAddress.transfer(msg.value);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseUri;
    }

    function setBaseUri(string memory newUri) external onlyOwner {
        baseUri = newUri;
    }

    function setProjectOwner(address addr) external onlyProjectOwner(projectOwnerAddress) {
        projectOwnerAddress = payable(addr);
    }

    function setListingPrice(uint256 _listingPrice) external onlyProjectOwner(projectOwnerAddress) {
        listingPrice = _listingPrice;
    }

    function setNFTPrice(uint256 _nftPrice) external onlyOwner {
        nftPrice = _nftPrice;
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

    /// @dev allow the contract owner update the amount of NFTs a user is allowed to mint
    function updateWhitelist(address _addr, uint256 amount) external onlyOwner whenNotPaused {
        whitelistedAddresses[_addr] = amount;
    }

    /// @dev allow a whitelisted user to safely mint an NFT to a specific address
    function userWhitelistMint() external whenNotPaused {
        require(whitelistedAddresses[msg.sender] > 0, "user is not whitelisted");
        require(nftPrice > 0, "Price needs to be set");
        bool tokensTransferredFrom = IERC20(token).transferFrom(msg.sender, contractOwner, nftPrice);
        require(tokensTransferredFrom, "transfer failed");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        whitelistedAddresses[msg.sender] -= 1;
        _safeMint(msg.sender, tokenId);
    }

    /// @dev allow the owner to safely mint an NFT to a specific address
    function ownerWhitelistMint(address to) external onlyOwner whenNotPaused {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
