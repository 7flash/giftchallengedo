const HDWalletProvider = require('truffle-hdwallet-provider');

const fs = require('fs');
const path = require('path');

const mnemonic = fs.readFileSync(path.resolve(__dirname, "mnemonic")).toString().trim();

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id,
      gas: 8e6,
    },
    kovan: {
      host: 'localhost',
      port: 8546,
      network_id: '42',
      gas: 4712388,
    },
      ropsten: {
          provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/jPkVat66IVKkmtAsy0DJ"),
          network_id: 3,
          gas: 4600000,
          gasPrice: 30e9
      },
      mainnet: {
          provider: new HDWalletProvider(mnemonic, "https://mainnet.infura.io/jPkVat66IVKkmtAsy0DJ"),
          network_id: 1,
          gas: 7000000,
          gasPrice: 20e9
      }
  },
  test_directory: 'transpiled/test',
  migrations_directory: 'transpiled/migrations',
	solc: {
		optimizer: {
			enabled: true,
			runs: 200
		}
	}
};
