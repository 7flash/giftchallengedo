const GiftChallenge = artifacts.require("GiftChallenge");

module.exports = (deployer: any) => {
    deployer.deploy(GiftChallenge);
};
