const ElpisHeroesData = artifacts.require("./ElpisHeroesData.sol");
const ElpisHeroes = artifacts.require("./ElpisMetaverseHeroes.sol");

const _elpisHeroesData = ElpisHeroesData.address;

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(ElpisHeroes, _elpisHeroesData);
};
