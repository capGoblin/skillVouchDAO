// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SkillVouchNFT is ERC721, ERC721URIStorage, ERC721Burnable {
    uint256 private _tokenId;
    mapping(address => uint256) public userToTokenId;
    mapping(uint256 => string) public tokenIdToURI;

    constructor() ERC721("SkillVouchNFT", "SVT") {}

    function safeMint(address to, string memory uri) public {
        _tokenId = _tokenId++;
        _safeMint(to, _tokenId);

        userToTokenId[to] = _tokenId;
        tokenIdToURI[_tokenId] = uri;
    }

    function getURIByUser(address user) public view returns (string memory) {
        require(userToTokenId[user] != 0, "User does not have a token minted.");
        return tokenIdToURI[userToTokenId[user]];
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
