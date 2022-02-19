require('dotenv').config();

const HDWalletProvider = require('@truffle/hdwallet-provider');  // @notice - Should use new module.
const mnemonic = process.env.MNEMONIC;
const infuraKey = process.env.INFURA_KEY

module.exports = {
  networks: {
	ropsten: {
        provider: () => new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/v3/' + process.env.INFURA_KEY),
        network_id: '3',
        gas: 4712388,
        //gas: 4465030,          // Original
        //gasPrice: 5000000000,  // 5 gwei (Original)
        //gasPrice: 10000000000, // 10 gwei
        gasPrice: 100000000000,  // 100 gwei
        skipDryRun: true,        // Skip dry run before migrations? (default: false for public nets)
	},
	kovan: {
        provider: () => new HDWalletProvider(mnemonic, 'https://kovan.infura.io/v3/' + process.env.INFURA_KEY),
        network_id: '42',
        gas: 6465030,
        gasPrice: 5000000000, // 5 gwei
        skipDryRun: true,     // Skip dry run before migrations? (default: false for public nets)
	},
	rinkeby: {
        networkCheckTimeout: 10000, 
        provider: () => new HDWalletProvider('' + mnemonic, "https://rinkeby.infura.io/v3/" + infuraKey),
        network_id: 4,
        gas: 6000000,         // 2 times than before
        gasPrice: 5000000000, // 5 gwei,
        skipDryRun: true,     // Skip dry run before migrations? (default: false for public nets)
        //from: process.env.DEPLOYER_ADDRESS
	},
    // rinkeby: {
    //     network_id: 4,
    //     host: '127.0.0.1',
    //     port: 8545,
    //     gas: 4000000,
    //     from: '0xA85974BF3e80a2D3E5AAE6b223D7EDB7A1C73488'
    // },
	goerli: {
        provider: () => new HDWalletProvider(mnemonic, "https://goerli.infura.io/v3/" + process.env.INFURA_KEY),
        network_id: 5,
        gas: 7500000,
        gasPrice: 5000000000, // 5 gwei,
        skipDryRun: true,     // Skip dry run before migrations? (default: false for public nets)
        //from: process.env.DEPLOYER_ADDRESS
	},
	// main ethereum network(mainnet)
	live: {
        provider: () => new HDWalletProvider(mnemonic, "https://mainnet.infura.io/v3/" + process.env.INFURA_KEY),
        network_id: 1,
        gas: 5500000,
        gasPrice: 2000000000 // 2 gwei
	},
	local: {
        host: '127.0.0.1',
        port: 8545,
        network_id: '*',
        skipDryRun: true,
        gasPrice: 5000000000
	},
	local_ganache: {
        host: '127.0.0.1',
        port: 7545,
        network_id: '*',
        skipDryRun: true,
        gasPrice: 5000000000
	}
  },
  compilers: {
	solc: {
		version: "^0.8.0",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
	}
  }
};
