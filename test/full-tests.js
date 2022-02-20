const { expect } = require("chai");

const { BigNumber } = require("ethers");
const { network } = require("hardhat");

const tokenId = 1;
const minPrice = 10000;
const newPrice = 15000;
const buyNowPrice = 100000;
const tokenBidAmount = 25000;
const tokenAmount = 50000;
const zeroAddress = "0x0000000000000000000000000000000000000000";
const zeroERC20Tokens = 0;
const emptyFeeRecipients = [];
const emptyFeePercentages = [];

// Deploy and create a mock erc721 contract.
// Test end to end auction
describe("Test Start", function () {
	let ElpisHeroes;
	let ElpisHeroesData;
	let ElpisHeroesMarketplace;

    let ElpisHeroesContract;
	let ElpisHeroesDataContract;
	let ElpisHeroesMarketplaceContract;

    let contractOwner;
	let user1;
	let user2;
	let user3;
	let user4;
	before(async function () {
        // console.log('beforeEach called');
		ElpisHeroes = await ethers.getContractFactory("ElpisMetaverseHeroes");
		ElpisHeroesData = await ethers.getContractFactory("ElpisHeroesData");
		ElpisHeroesMarketplace = await ethers.getContractFactory("ElpisHeroMarketplace");

        [contractOwner, user1, user2, user3, user4] = await ethers.getSigners();

        ElpisHeroesDataContract = await ElpisHeroesData.deploy();
        await ElpisHeroesDataContract.deployed();

        ElpisHeroesContract = await ElpisHeroes.deploy(ElpisHeroesDataContract.address);
        await ElpisHeroesContract.deployed();
        ElpisHeroesDataContract.setElpisHeroContract(ElpisHeroesContract.address);

        // initially mint 5 heroes to deployedContract
        await ElpisHeroesContract.mint(contractOwner.address, "Tigress");
        await ElpisHeroesContract.mint(contractOwner.address, "Mantis");
        await ElpisHeroesContract.mint(contractOwner.address, "Viper");
        await ElpisHeroesContract.mint(contractOwner.address, "Crane");
        await ElpisHeroesContract.mint(contractOwner.address, "Monkey");

        ElpisHeroesMarketplaceContract = await ElpisHeroesMarketplace.deploy(ElpisHeroesDataContract.address, ElpisHeroesContract.address);
		await ElpisHeroesMarketplaceContract.deployed();

	});
    describe("General", async function () {
        it("Total supply of ElpisHeroes should be 5", async function () {
            const totalSupply = await ElpisHeroesContract.totalSupply();
            expect(totalSupply).to.equal(5);
        });
        it("Minted ElpisHeroes should be owned by contract owner", async function() {
            const totalSupply = await ElpisHeroesContract.totalSupply();
            const balanceOfContractOwner = await ElpisHeroesContract.balanceOf(contractOwner.address);
            expect(totalSupply).to.equal(balanceOfContractOwner);
        });
        it("Total supply of ElpisHeroesData should be equal to total supply of ElpisHeroes", async function() {
            const allHeroData = await ElpisHeroesDataContract.getAllElpisData();
            const totalSupplyOfElpisHeroes = await ElpisHeroesContract.totalSupply();
            expect(totalSupplyOfElpisHeroes).to.equal(allHeroData.length);
        });
    });
    describe("Change sale status and price", async function() {
        it("The sale status of Hero#1 should be Canceled", async function() {
            await ElpisHeroesDataContract.updateStatus(1, "Cancelled");
            const ElpisHero1Data = await ElpisHeroesDataContract.getElpisHeroData(1);
            expect(ElpisHero1Data.status).to.equal("Cancelled");
        });
        it("The price of Hero#1 should be 20", async function() {
            let ElpisHero1Data = await ElpisHeroesDataContract.getElpisHeroData(1);
            expect(ElpisHero1Data.heroPrice).to.equal(0);
            ElpisHeroesDataContract.updatePrice(1, 20);
            ElpisHero1Data = await ElpisHeroesDataContract.getElpisHeroData(1);
            expect(ElpisHero1Data.heroPrice).to.equal(20);
        });
    });
    describe("Buy ElpisHero", async function() {
        it("Contract Owner change status of ElpisHero#1", async function() {
            await ElpisHeroesDataContract.connect(contractOwner).updateStatus(1, "Open");
            const ElpisHero1Data = await ElpisHeroesDataContract.getElpisHeroData(1);
            expect(ElpisHero1Data.status).to.equal("Open");

            await ElpisHeroesContract.connect(contractOwner).approve(ElpisHeroesMarketplaceContract.address, 1);
            const ApprovedStatusOfElpisHero1 = await ElpisHeroesContract.getApproved(1);
            expect(ApprovedStatusOfElpisHero1).to.equal(ElpisHeroesMarketplaceContract.address);
        })
        it("User1 buys ElpisHero#1", async function() {
            let balance = await ethers.provider.getBalance(user1.address);
            let balanceOfUser1 = await ElpisHeroesContract.balanceOf(user1.address);
            console.log('ether balance before buying', balance / 10 ** 18);
            console.log('balance before buying', balanceOfUser1)

            await ElpisHeroesMarketplaceContract.connect(user1).buyElpisHero(1, {value: 20});
            balanceOfUser1 = await ElpisHeroesContract.balanceOf(user1.address);

            balance = await ethers.provider.getBalance(user1.address);
            console.log('ether balance after buying', balance / 10 ** 18);
            console.log('balance after buying', balanceOfUser1)
        })
    });
    describe("Get Account Inventory", async function() {
        it("Get balance of Contract Owner", async function() {
            const balanceOfContractOwner = await ElpisHeroesContract.balanceOf(contractOwner.address);
            expect(balanceOfContractOwner).to.equal(4);
            let tokenIdsOfContractOwner = [], tokenMetadataOfContractOwner = [];
            for(let index = 0; index < balanceOfContractOwner; index++ ) {
                const tokenId = await ElpisHeroesContract.tokenOfOwnerByIndex(contractOwner.address, index);
                tokenIdsOfContractOwner.push(tokenId);
                const tokenMetadata = await ElpisHeroesDataContract.getElpisHeroData(tokenId);
                tokenMetadataOfContractOwner.push(tokenMetadata);
            }
            // console.log({
            //     tokenId: tokenIdsOfContractOwner,
            //     metadata: tokenMetadataOfContractOwner
            // });
            expect(tokenIdsOfContractOwner.length).to.equal(4);
        })
        it("Get balance of User1", async function() {
            const balanceOfUser1 = await ElpisHeroesContract.balanceOf(user1.address);
            expect(balanceOfUser1).to.equal(1);

            let tokenIdsOfUser1 = [], tokenMetadataOfUser1 = [];
            
            for(let index = 0; index < balanceOfUser1; index++ ) {
                const tokenId = await ElpisHeroesContract.tokenOfOwnerByIndex(user1.address, index);
                tokenIdsOfUser1.push(tokenId);
                const tokenMetadata = await ElpisHeroesDataContract.getElpisHeroData(tokenId);
                tokenMetadataOfUser1.push(tokenMetadata);
            }
            // console.log({
            //     tokenId: tokenIdsOfUser1,
            //     metadata: tokenMetadataOfUser1
            // });
            expect(tokenIdsOfUser1.length).to.equal(1);
        })

    })
});


    /**
    describe("Security", async function() {
        it("Can update price of its token", async function() {
            let ElpisHero3Data = await ElpisHeroesDataContract.getElpisHeroData(3);
            expect(ElpisHero3Data.heroPrice).to.equal(0);
            await ElpisHeroesDataContract.connect(contractOwner).updatePrice(3, 30);
            ElpisHero3Data = await ElpisHeroesDataContract.getElpisHeroData(3);
            expect(ElpisHero3Data.heroPrice).to.equal(30);
        });
        it("Shouldn't update price of other's token", async function() {
            let ElpisHero3Data = await ElpisHeroesDataContract.getElpisHeroData(3);
            expect(ElpisHero3Data.heroPrice).to.equal(0);
            await ElpisHeroesDataContract.connect(user2).updatePrice(3, 30);
            ElpisHero3Data = await ElpisHeroesDataContract.getElpisHeroData(3);
            expect(ElpisHero3Data.heroPrice).to.equal(0);
        });
        it("Shouldn't update sale status of other's token", async function() {
            let ElpisHero4Data = await ElpisHeroesDataContract.getElpisHeroData(4);
            expect(ElpisHero4Data.status).to.equal("Open");
            await ElpisHeroesDataContract.connect(user2).updateStatus(4, "Cancelled");
            ElpisHero4Data = await ElpisHeroesDataContract.getElpisHeroData(4);
            expect(ElpisHero4Data.status).to.equal("Cancelled");
        });
    });
     */
