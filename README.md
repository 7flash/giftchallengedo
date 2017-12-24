## Decentralized charity project

Your actions has value. This value can be represented as cryptocurrency.

Gift Token is ERC-721 token. Every coin is unique and indivisible.

Every token is linked to unique post in social network confirming the unique action.

When you make a gift to someone who need it you can share confirmation in social network.

Then you can mine unique coin for yourself connected to your gift.

Anybody can buy your coin even with the price more than you have paid for gift.

Servant
---------------
If you want to serve people but you haven't money you still can help others with your time and receive money from investors
1) Make a gift to someone in need
2) Share confirmation in social network with hashtag #giftchallengedo
3) Call method `claimGift` with your address and link to your post
4) Receive your unique coin and wait for payments

Investor
---------------
If you have money but you haven't time you can help people giving your money for gifts through servants
1) Find the action you like in social network using hashtag #giftchallengedo
2) Check the price of token linked to this action
3) Call method `claimToken` with link to the post and payment you want to give. (Your payment should be at least 2x more than last payment)

Contributor
---------------
If you can create interface, we really need it. Also thanks for any issues and pull requests.

##### Dependencies

Install dependencies:
```
npm install
```

##### Testing

Start `testrpc`:
```
npm run testrpc
```
Run `truffle` migrations:
```
npm run migrate
```
Run `truffle` tests:
```
npm test
```