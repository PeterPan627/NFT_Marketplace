const ElpisHeroesData = artifacts.require("./ElpisHeroesData.sol");

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(ElpisHeroesData);
};
