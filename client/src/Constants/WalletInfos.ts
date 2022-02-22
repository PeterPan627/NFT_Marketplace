import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { BscConnector } from "@binance-chain/bsc-connector";
import { ethers } from "ethers";
import { ContractType } from "../utils/wallet";

export enum ConnectorNames {
  Injected = "injected",
  WalletConnect = "walletconnect",
  BSC = "bsc",
}

interface Connector {
  title: string;
  icon: string;
  connectorId: ConnectorNames;
}

const WalletInfos: Connector[] = [
  {
    title: "Metamask",
    icon: "/assets/images/wallets/metamask.svg",
    connectorId: ConnectorNames.Injected,
  },
  {
    title: "Binance Chain",
    icon: "/assets/images/wallets/binance.svg",
    connectorId: ConnectorNames.BSC,
  },
  {
    title: "Wallet Connect",
    icon: "/assets/images/wallets/walletconnect.svg",
    connectorId: ConnectorNames.WalletConnect,
  },
];

export default WalletInfos;

// const POLLING_INTERVAL = 12000;

// const rpcUrl = "https://bsc-dataseed1.defibit.io";   // binance mainnet
const rpcUrl = "https://data-seed-prebsc-1-s1.binance.org:8545/"; // binance testnet

// const chainId = parseInt(process.env.REACT_APP_CHAIN_ID || "", 10);
// const chainId = 56;  // binance mainnet
const chainId = 97; // binance testnte

const injected = new InjectedConnector({ supportedChainIds: [chainId] });

const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  bridge: "https://pancakeswap.bridge.walletconnect.org/",
  qrcode: true,
  // pollingInterval: POLLING_INTERVAL,
});

const bscConnector = new BscConnector({ supportedChainIds: [chainId] });

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: bscConnector,
};

export const contractAddress = {
  [ContractType.ElpisHeroesData]: "0x29371119C860f0B7dc96AD8014614364604482E7",
  [ContractType.ElpisHeroes]: "0x6BDe81297042ecCC894766eF4CF316389aC1900D",
  [ContractType.ElpisHeroesMarketplace]:
    "0x16B564313d62CcA844cc6707FBeadbDBFf40E998",
};

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
