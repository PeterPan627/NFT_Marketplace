const { network } = require("hardhat");
module.exports = async ({ getNamedAccounts, deployments }) => {
	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();

    console.log('deployer', deployer)

	let elpisHeroesData = await deploy("ElpisHeroesData", {
			from: deployer,
			log: true,
	});
	let elpisHeroes = await deploy("ElpisMetaverseHeroes", {
			from: deployer,
			log: true,
		args: [elpisHeroesData.address],
	});

	// await elpisHeroes.mint(deployer, "Tigress");
	// await elpisHeroes.mint(deployer, "Mantis");
	// await elpisHeroes.mint(deployer, "Viper");
	// await elpisHeroes.mint(deployer, "Crane");
	// await elpisHeroes.mint(deployer, "Monkey");

	let elpisHeroesMarketplace = await deploy("ElpisHeroMarketplace", {
			from: deployer,
			log: true,
		args: [elpisHeroesData.address, elpisHeroes.address],
	});
};
module.exports.tags = ["all"];
