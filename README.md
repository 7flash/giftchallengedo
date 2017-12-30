Decentralized charity token
---------------

GIFT is indivisible infungible ERC-721 Token. Every token is connected with unique person and unique accomplished good deed.

Purpose
---------------

It would allow to invest time to help people and get money in reward.

It would allow to invest money in specific actions and receive token in reward.

Implementation
---------------

Cryptocurrency allows to mint and distribute money without a central power by the rules of the community.

Cryptocurrency allows to represent the value of infungible assets, like information, actions, or cryptokitties.

Gift represents the value of good works. Anyone can mint token connected to gift given to someone who need it.
Then anyone else can buy good deed and receive token that confirms the accomplishment of good deed. 

It is the simplest approach to implement the vision of economy where everybody will have an access to resources in order to develop the society.

Help
---------------

You can participate as servant, investor or contributor.

### Servant

If you have time and you see the needs of people around you can follow next steps:
1) Make a gift to someone who need it
2) Share confirmation in social network with hashtag #giftchallengedo
3) Call method `createToken` with your ethereum address and link to your post
5) Receive payment from investors... and goto 1 step.

### Investor
If you have money and you want to buy gifts and motivate servants you can follow next steps:
1) Find the action you like in social network using hashtag #giftchallengedo
2) Check the price of token linked to the action
3) Call method `buyToken` with link to the post and payment you want to give. Your payment should be at least 2x more than last payment. It will be distributed between previous investor and servant equally.

### Contributor
Need for interface. Community will really appreciate it. Also thanks for any questions, issues and pull requests.

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