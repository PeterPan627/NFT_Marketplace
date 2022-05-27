import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";

import { resolve } from "path";

import { config as dotenvConfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
// import { NetworkUserConfig } from "hardhat/types";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const chainIds = {
    goerli: 5,
    hardhat: 31337,
    kovan: 42,
    mainnet: 1,
    rinkeby: 4,
    ropsten: 3,
};

const privateKey: string | undefined =
    process.env.PRIVATE_KEY ?? "NO_PRIVATE_KEY";
// Make sure node is setup on Alchemy website
const alchemyApiKey: string | undefined =
    process.env.ALCHEMY_API_KEY ?? "NO_ALCHEMY_API_KEY";

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    gasReporter: {
        currency: "USD",
        enabled: process.env.REPORT_GAS ? true : false,
        excludeContracts: [],
        src: "./contracts",
    },
    networks: {
        hardhat: {
            gasPrice: "auto",
            gasMultiplier: 2,
        },
        localnet: {
            // Ganache etc.
            url: "http://127.0.0.1:8545",
            gasPrice: "auto",
            gasMultiplier: 2,
        },
        mainnet: {
            url: `https://bsc-dataseed.binance.org/`,
            accounts: [`0x${privateKey}`],
        },
        testnet: {
            url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
            accounts: [`0x${privateKey}`],
        },
    },
    paths: {
        artifacts: "./artifacts",
        cache: "./cache",
        sources: "./contracts",
        tests: "./test",
        deploy: "./deploy",
        deployments: "./deployments",
    },
    solidity: {
        compilers: [
            {
                version: "0.8.4",
                settings: {
                    metadata: {
                        bytecodeHash: "none",
                    },
                    optimizer: {
                        enabled: true,
                        runs: 800,
                    },
                },
            },
            {
                version: "0.6.12",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 800,
                    },
                },
            },
            {
                version: "0.6.2",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 800,
                    },
                },
            },
            {
                version: "0.6.0",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 800,
                    },
                },
            },
            {
                version: "0.6.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 800,
                    },
                },
            },
            {
                version: "0.5.0",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 800,
                    },
                },
            },
            {
                version: "0.5.16",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 800,
                    },
                },
            },
            {
                version: "0.4.18",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 800,
                    },
                },
            },
        ],
        settings: {
            outputSelection: {
                "*": {
                    "*": ["storageLayout"],
                },
            },
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        daoMultisig: {
            // mainnet
            1: "0x245cc372C84B3645Bf0Ffe6538620B04a217988B",
        },
    },
    typechain: {
        outDir: "types",
        target: "ethers-v5",
    },
    etherscan: {
        apiKey: process.env.BSC_API_KEY,
    },
};

export default config;
