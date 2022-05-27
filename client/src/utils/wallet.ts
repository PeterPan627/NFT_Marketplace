import { BigNumber, ethers } from "ethers";

import { contractAddress, simpleRpcProvider } from "../constants/WalletInfos";

import HeroesDataContract from "../abi/ElpisHeroesData.json";
import Heroes from "../abi/ElpisMetaverseHeroes.json";
import HeroesMarketplace from "../abi/ElpisHeroMarketplace.json";

export enum ContractType {
  ElpisHeroesData,
  ElpisHeroes,
  ElpisHeroesMarketplace,
}

const contractAbis = {
  [ContractType.ElpisHeroesData]: HeroesDataContract,
  [ContractType.ElpisHeroes]: Heroes,
  [ContractType.ElpisHeroesMarketplace]: HeroesMarketplace,
};

export const setupNetwork = async () => {
  const provider = window.ethereum;
  if (provider) {
    const chainId = parseInt(process.env.REACT_APP_CHAIN_ID || "", 10);
    try {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: "Binance Smart Chain Mainnet",
            nativeCurrency: {
              name: "BNB",
              symbol: "bnb",
              decimals: 18,
            },
            rpcUrls: [
              process.env.REACT_APP_NODE_1,
              process.env.REACT_APP_NODE_2,
              process.env.REACT_APP_NODE_3,
            ],
            blockExplorerUrls: ["https://bscscan.com/"],
          },
        ],
      });
      return true;
    } catch (error) {
      console.error("Failed to setup the network in Metamask:", error);
      return false;
    }
  } else {
    console.error(
      "Can't setup the BSC network on metamask because window.ethereum is undefined"
    );
    return false;
  }
};

export const getContract = (contractType: ContractType, signer?: any) => {
  const address = contractAddress[contractType];
  const abi = JSON.stringify(contractAbis[contractType].abi);
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

const ElpisHeroDataStructure = [
  { key: "elpisHeroId", convert: (value: BigNumber) => value.toNumber() },
  { key: "elpisHeroName" },
  { key: "ownerAddress" },
  {
    key: "heroPrice",
    convert: (value: BigNumber) =>
      value.div(BigNumber.from("" + 10 ** 10)).toNumber() * 10 ** 10,
  },
  { key: "status" },
  { key: "reputation", convert: (value: BigNumber) => value.toNumber() },
];

const convertElpisHeroDataStructure = (elpisHero: []) => {
  let result: { [key: string]: any } = {};
  elpisHero.map((item, index) => {
    const crrStructure = ElpisHeroDataStructure[index];
    result[crrStructure.key] = crrStructure.convert
      ? crrStructure.convert(item)
      : item;
    return 0;
  });
  return result;
};

export const fetchAllHeroes = async () => {
  const elpisHeroesContract = getContract(ContractType.ElpisHeroes);
  const elpisHeroesDataContract = getContract(ContractType.ElpisHeroesData);
  const totalSupplyOfElpisHeroes = await elpisHeroesContract.totalSupply();
  let result = [];
  for (let index = 0; index < totalSupplyOfElpisHeroes.toNumber(); index++) {
    const currentTokenId = await elpisHeroesContract.tokenByIndex(index);
    const currentHero = await elpisHeroesDataContract.getElpisHeroData(
      currentTokenId
    );
    const currentHeroStructured = convertElpisHeroDataStructure(currentHero);
    currentHeroStructured.status === "Open" &&
      result.push(currentHeroStructured);
  }
  return result;
};

export const fetchMyHeroes = async (account: string) => {
  const elpisHeroesDataContract = getContract(ContractType.ElpisHeroesData);
  const elpisHeroesContract = getContract(ContractType.ElpisHeroes);
  const balance = await elpisHeroesContract.balanceOf(account);
  let result = [];
  for (let index = 0; index < balance.toNumber(); index++) {
    const currentTokenId = await elpisHeroesContract.tokenOfOwnerByIndex(
      account,
      index
    );
    const currentHero = await elpisHeroesDataContract.getElpisHeroData(
      currentTokenId
    );
    result.push(convertElpisHeroDataStructure(currentHero));
  }
  return result;
};

export const fetchHeroDataByHeroId = async (heroId: number) => {
  const elpisHeroesDataContract = getContract(ContractType.ElpisHeroesData);
  const heroData = await elpisHeroesDataContract.getElpisHeroData(heroId);
  const result = convertElpisHeroDataStructure(heroData);
  return result;
};

export const orderHero = async (heroId: number, signer: any) => {
  console.log("start order hero");
  const elpisHeroesDataContract = getContract(
    ContractType.ElpisHeroesData,
    signer
  );
  const tx = await elpisHeroesDataContract
    .connect(signer)
    .updateStatus(heroId, "Open", {
      gasPrice: 10 ** 10,
      gasLimit: 210000,
    });
  await tx.wait();
  let currentHeroData = await elpisHeroesDataContract.getElpisHeroData(heroId);
  currentHeroData = convertElpisHeroDataStructure(currentHeroData);
  console.log("middle", currentHeroData);
  if (currentHeroData.status === "Open") {
    const elpisHeroesContract = getContract(ContractType.ElpisHeroes);
    const tx2 = await elpisHeroesContract
      .connect(signer)
      .approve(contractAddress[ContractType.ElpisHeroesMarketplace], heroId);
    await tx2.wait();
    console.log("end order hero");
  }
};

export const cancelOrderHero = async (heroId: number, signer: any) => {
  console.log("start cancel order hero");
  const elpisHeroesContract = getContract(ContractType.ElpisHeroes, signer);
  const tx1 = await elpisHeroesContract.connect(signer).revokeApprove(heroId);
  await tx1.wait();

  const elpisHeroesDataContract = getContract(ContractType.ElpisHeroesData);
  const tx2 = await elpisHeroesDataContract
    .connect(signer)
    .updateStatus(heroId, "Cancelled", {
      gasPrice: 10 ** 10,
      gasLimit: 210000,
    });
  await tx2.wait();
  console.log("end cancel order hero");
};

export const editHeroPrice = async (
  heroId: number,
  price: number,
  signer: any
) => {
  if (price < 0) return;
  console.log("start editing hero price", price);
  const priceInBigNumber = BigNumber.from("" + price * 10 ** 18);
  console.log("price in big number", priceInBigNumber);
  // console.log("signer=", signer);
  const elpisHeroesDataContract = getContract(
    ContractType.ElpisHeroesData,
    signer
  );
  // console.log("elpisHeroesDataContract", elpisHeroesDataContract);
  const tx = await elpisHeroesDataContract
    .connect(signer)
    .updatePrice(heroId, priceInBigNumber, {
      gasPrice: 10 ** 10,
      gasLimit: 210000,
    });
  await tx.wait();
  console.log("end editing hero price");
};

export const buyHero = async (heroId: number, signer: any) => {
  console.log("start buying hero");
  let currentHeroData = await fetchHeroDataByHeroId(heroId);

  const elpisHeroMarketplaceContract = getContract(
    ContractType.ElpisHeroesMarketplace,
    signer
  );

  const price = currentHeroData.heroPrice;
  console.log("hero price", price);

  const tx = await elpisHeroMarketplaceContract
    .connect(signer)
    .buyElpisHero(heroId, { value: BigNumber.from("" + price) });
  await tx.wait();
  console.log("end buying hero");
};
