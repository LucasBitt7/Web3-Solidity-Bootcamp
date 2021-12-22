// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
contract EncodeToken is ERC721URIStorage {
using Counters for Counters.Counter;
Counters.Counter private _tokenIds;
constructor() ERC721("EncodeToken", "ENC") {}
function mintToken(address tokenOwner, string memory tokenURI)
public
returns (uint256)
{
_tokenIds.increment();
uint256 newItemId = _tokenIds.current();
_mint(tokenOwner, newItemId);
_setTokenURI(newItemId, tokenURI);
return newItemId;
}

function transferToken(address _to, uint256 _tokenId) public {
  safeTransferFrom(msg.sender, _to, _tokenId);
}
}