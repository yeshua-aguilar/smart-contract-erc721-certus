// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract TestERC721 is ERC721URIStorage {
    uint256 private _tokenIds;

    constructor() ERC721("TestERC721", "T721") {}

    function mint(address to, string memory _tokenURI) public {
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _mint(to, newItemId);
        _setTokenURI(newItemId, _tokenURI);
    }

    function ownerOf(uint256 tokenId) public view override(ERC721, IERC721) returns (address) {
        return super.ownerOf(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}
