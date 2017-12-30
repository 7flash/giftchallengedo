import * as BigNumber from "bignumber.js";
import * as chai from "chai";
import * as Web3 from "web3";
import * as ABIDecoder from "abi-decoder";

import {BigNumberSetup} from "./utils/bignumber_setup.js";
import {chaiSetup} from "./utils/chai_setup.js";
import {INVALID_OPCODE, REVERT_ERROR} from "./utils/constants";

chaiSetup.configure();
const expect = chai.expect;

BigNumberSetup.configure();

import {GiftChallengeContract} from "../../types/generated/gift_challenge";
import {CharityTokenContract} from "../../types/generated/charity_token";
import {LogTokenCreated, LogTokenBought} from "./utils/logs";

const challengeContract = artifacts.require("GiftChallenge");
const tokenContract = artifacts.require("CharityToken");

ABIDecoder.addABI(challengeContract.abi);
ABIDecoder.addABI(tokenContract.abi);

contract("Gift Challenge", ([deployer, servant, investor, anotherInvestor]) => {
    let challenge: GiftChallengeContract;
    let token: CharityTokenContract;

    const post = "facebook.com/userid/postid";

    let payment:BigNumber.BigNumber = new BigNumber.BigNumber(web3.toWei(0.01, "ether"));

    const init = async () => {

        const defaults = {from: deployer, gas: 8000000};

        const challengeInstance = await challengeContract.new(defaults);
        const web3ChallengeInstance = web3.eth.contract(challengeInstance.abi).at(challengeInstance.address);

        challenge = new GiftChallengeContract(web3ChallengeInstance, defaults);

        const tokenAddress = await challenge.token.callAsync();
        const web3TokenInstance = web3.eth.contract(tokenContract.abi).at(tokenAddress);

        token = new CharityTokenContract(web3TokenInstance, defaults);
    }

    before(init);

    describe("investor claim post for servant before anybody else", async () => {
        let res: Web3.TransactionReceipt;

        before(async () => {
            const txHash = await challenge.createToken.sendTransactionAsync(servant, post, {from: investor});
            res = await web3.eth.getTransactionReceipt(txHash);
        });

        it("should emit post claimed log", async () => {
            const logs = ABIDecoder.decodeLogs(res.logs);
            const logActual = logs.find(e => e && e.name === 'TokenCreated');

            const logExpected = LogTokenCreated(challenge.address, servant, post, 0);

            expect(logActual).to.deep.equal(logExpected);
        });

        it("should create new token for servant", async () => {
           await expect(token.balanceOf.callAsync(servant))
               .to.eventually.bignumber.equal(1);
        });

        it("should create new post for servant", async () => {
           await expect(challenge.getOwner.callAsync(post))
               .to.eventually.be.equal(servant);
        });

        it("should link token to post", async () => {
           const tokenId = await challenge.getToken.callAsync(post);

           await expect(token.tokenMetadata.callAsync(tokenId))
               .to.eventually.be.equal(post);
        });
    });

    describe("another investor claim post that was already claimed", async () => {
        it("should throw", async () => {
           await expect(challenge.createToken.sendTransactionAsync(servant, post, {from: anotherInvestor}))
               .to.eventually.be.rejectedWith(REVERT_ERROR);
        });
    });

    describe("investor claim minted token before anybody else with any payment", async () => {
        let res: Web3.TransactionReceipt;

        before(async () => {
           const txHash = await challenge.buyToken.sendTransactionAsync(post, {from: investor, value: payment});
           res = await web3.eth.getTransactionReceipt(txHash);
        });

        it("should emit token claimed log", async () => {
           const logs = ABIDecoder.decodeLogs(res.logs);
           const logActual = logs.find(e => e && e.name === 'TokenBought');

           const logExpected = LogTokenBought(challenge.address, 0, servant, investor, 0, payment);

           expect(logActual).to.deep.equal(logExpected);
        });

        it("should transfer token from servant to investor", async () => {
           expect(token.balanceOf.callAsync(servant))
               .to.eventually.be.bignumber.equal(new BigNumber.BigNumber(0));
           expect(token.balanceOf.callAsync(investor))
               .to.eventually.be.bignumber.equal(new BigNumber.BigNumber(1));
        });
    })

    describe("investor claim token with more than double the previous payment", async () => {
       let res: Web3.TransactionReceipt;

       before(async () => {
           const txHash = await challenge.buyToken.sendTransactionAsync(post, {from: anotherInvestor, value: payment.mul(2)});
           res = await web3.eth.getTransactionReceipt(txHash);
       });

    });

    describe("investor claim token with less than double the previous payment", async () => {
       it("should throw", async () => {
           await expect(challenge.buyToken.sendTransactionAsync(post, {from: investor, value: payment.mul(2).sub(1)}))
               .to.eventually.be.rejectedWith(REVERT_ERROR);
        });
    });
});