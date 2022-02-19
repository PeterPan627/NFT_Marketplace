const ElpisHeroMarketplace = artifacts.require("./ElpisHeroMarketplace.sol");
const ElpisHeroesData = artifacts.require("./ElpisHeroesData.sol");
const ElpisHeroes = artifacts.require("./ElpisMetaverseHeroes.sol");

const _photoNFTData = ElpisHeroesData.address;
const _elpisHeroes = ElpisHeroes.address;

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(ElpisHeroMarketplace, _photoNFTData, _elpisHeroes);
};
