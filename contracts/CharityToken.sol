pragma solidity ^0.4.18;

import "./NonFungibleToken.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";

/**
 * @title MintableNonFungibleToken
 *
 * Superset of the ERC721 standard that allows for the minting
 * of non-fungible tokens.
 */
contract CharityToken is NonFungibleToken, Ownable {
    using SafeMath for uint;

    event Mint(address indexed _to, uint256 indexed _tokenId);

    modifier onlyNonexistentToken(uint _tokenId) {
        require(tokenIdToOwner[_tokenId] == address(0));
        _;
    }

    function CharityToken(string _name, string _symbol) {
        name = _name;
        symbol = _symbol;
    }

    function mint(address _owner, string _metadata)
        public onlyOwner returns(uint _tokenId)
    {
        uint tokenId = numTokensTotal;

        _setTokenOwner(tokenId, _owner);
        _addTokenToOwnersList(_owner, tokenId);
        _insertTokenMetadata(tokenId, _metadata);

        numTokensTotal = numTokensTotal.add(1);

        Mint(_owner, tokenId);

        return tokenId;
    }

    function forceTransfer(address _from, address _to, uint _tokenId)
        public onlyOwner
    {
        _clearApprovalAndTransfer(_from, _to, _tokenId);
    }
}
