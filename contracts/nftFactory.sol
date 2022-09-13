//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract nftFactory is ERC721URIStorage {
    
    uint256 private tokenId = 0;
    uint16 public firstC = 0;
    uint16 private secondC = 0;

    mapping(address => uint256) public addressToTokenId;

    constructor() ERC721("Cloud", "CLO") {}

    function mintNFT(string memory tokenURI)
        public
        onlyOneNFT()
        returns (uint256)
    {
        uint256 newItemId = tokenId;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        addressToTokenId[msg.sender] = newItemId;
        tokenId++;

        return newItemId;
    }

    function getTokenId() public view returns(uint256){
        return addressToTokenId[msg.sender];
    }

    function increaceFirstC() public {
        firstC++;
    }

    function increaceSecondC() public {
        secondC++;
    }

    function getFirstC() public view returns(uint16){
        return firstC;
    }

    function getSecondC() public view returns(uint16){
        return secondC;
    }

    modifier onlyOneNFT(){
        require(balanceOf(msg.sender) == 0);
        _;
    }
}
