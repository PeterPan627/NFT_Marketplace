const ElpisHeroMarketplace = artifacts.require("./ElpisHeroMarketplace.sol");
const ElpisHeroesData = artifacts.require("./ElpisHeroesData.sol");
const ElpisHeroes = artifacts.require("./ElpisMetaverseHeroes.sol");

const _elpisHeroesData = ElpisHeroesData.address;
const _elpisHeroes = ElpisHeroes.address;
const _elpisHeroMarketplace =ElpisHeroesData.address;

module.exports = async function(deployer, network, accounts) {
    /**
     * @notice you should use the first account of those created by ganache
     */

    console.info('active account', accounts[0], '\n')
    
    let deployedContract = {
        "ElpisHeroesData": {address: _elpisHeroesData},
        "ElpisHeroes": {address: _elpisHeroes},
        "ElpisHeroesMarketplace": {address: _elpisHeroMarketplace},
    }
    console.table(deployedContract);
};
