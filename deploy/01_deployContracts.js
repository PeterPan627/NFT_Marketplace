const { network, ethers } = require("hardhat");
module.exports = async ({ getNamedAccounts, deployments }) => {
	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();

    console.log('deployer', deployer)

    // console.log('ethers', ethers)

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

    const signer = await ethers.getSigner();
    const elpisHeroesDataContract = new ethers.Contract(elpisHeroesData.address, elpisHeroesData.abi, signer)
    await elpisHeroesDataContract.setElpisHeroContract(elpisHeroes.address);
};
module.exports.tags = ["all"];
