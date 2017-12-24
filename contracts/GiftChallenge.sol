pragma solidity ^0.4.18;

import "./CharityToken.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";

contract GiftChallenge {
    using SafeMath for uint;

    struct Gift {
        bool isGift;
        string confirmation;
        address servant;
        uint tokenId;
        uint lastPayment;
    }

    mapping(string => Gift) gifts;

    CharityToken public token;

    event GiftClaimed(address indexed _servant, string indexed _link, uint indexed _token);
    event TokenClaimed(uint indexed _token, address indexed _previousOwner, address indexed _newOwner, uint _previousPrice, uint _newPrice);

    function GiftChallenge() {
        token = createToken();
    }

    function claimGift(address _servant, string _link) public {
        require(_servant != address(0));

        Gift item = gifts[_link];

        require(item.isGift == false);

        uint tokenId = token.mint(_servant, _link);

        item.tokenId = tokenId;
        item.confirmation = _link;
        item.servant = _servant;
        item.isGift = true;

        GiftClaimed(_servant, _link, tokenId);
    }

    function claimToken(string _link) external payable {
        Gift memory item = gifts[_link];

        require(msg.value >= item.lastPayment.mul(2));

        address owner = token.ownerOf(item.tokenId);
        address servant = item.servant;

        uint half = msg.value / 2;

        owner.transfer(half);
        servant.transfer(msg.value - half);

        token.forceTransfer(owner, msg.sender, item.tokenId);

        gifts[_link].lastPayment = msg.value;

        TokenClaimed(item.tokenId, owner, msg.sender, item.lastPayment, msg.value);
    }

    function getPrice(string _link) public constant returns(uint) {
        return gifts[_link].lastPayment;
    }

    function getServant(string _link) public constant returns(address) {
        return gifts[_link].servant;
    }

    function getToken(string _link) public constant returns(uint) {
        return gifts[_link].tokenId;
    }

    function getOwner(string _link) public constant returns(address) {
        uint tokenId = gifts[_link].tokenId;
        address owner = token.ownerOf(tokenId);
        return owner;
    }

    function createToken() internal returns(CharityToken _token) {
        return new CharityToken("Gift Challenge Token", "GIFT");
    }
}