# loupe

One tool for Smart Contract extraction 

<h3 align="center">
  <img height="255" width="253" src="https://github.com/vondas-network/loupe/blob/main/img/loupe.png?raw=true"/>
</h3>

# What does it do?
*loupe* excels at one thing, Smart Contract extraction. It can extract master Solidity files which contain multiple contracts in one file as well as Solidity files that are aggregated into a nested JSON file. The type of Solidity file returned by *loupe* is blockchain dependent. 


## Ethereum/Binance
On Ethereum/Binance, we found most Smart Contracts are either an individual Smart contract with multiple functions or a Smart Contract that containes multiple Solidity files.


## Avalanche
On Avalanche, we found most responses to be JSON files containing multiple Solidity files nested within an object.

0x053502bf08b7d3a54891bb66fb966ea4c4ba7d02

## Preparing files for compiling

# Requirements
- [Node.js](https://nodejs.org/en/download/)
- [@vondas/viewfinder](https://www.npmjs.com/package/@vondas/viewfinder)
- [dotenv](https://www.npmjs.com/package/dotenv) 
- API keys (*listed below*)

# Support Blockchains
An *API key* is required for each Etherscan clone, free tiers are available.

## Testnet

| Testnet | Blockchain | Endpoint                         |
| ------- | ---------- | -------------------------------- |
| Ropsten | Ethereum   | https://api-ropsten.etherscan.io |
| Kovan   | Ethereum   | https://api-kovan.etherscan.io   |
| Rinkeby | Ethereum   | https://api-rinkeby.etherscan.io |

## Mainnet

| Mainnet   | Endpoint                            | Docs                                         |
| --------- | ----------------------------------- | -------------------------------------------- |
| Ethereum  | https://api.etherscan.io            | https://docs.etherscan.io/                   |
| Avalanche | https://api.snowtrace.io            | https://snowtrace.io/apis                    |
| Binance   | https://api.bscscan.com             | https://docs.bscscan.com/                    |
| Heco      | https://api.hecoinfo.com            | https://hecoinfo.com/apis                    |
| Cronos    | https://api.cronoscan.com           | https://cronoscan.com/apis                   |
| Moonriver | https://api-moonriver.moonscan.io   | https://moonriver.moonscan.io/apis           |
| Moonbeam  | https://blockscout.moonbeam.network | https://blockscout.moonbeam.network/api-docs |
| Arbitrum  | https://api.arbiscan.io             | https://arbiscan.io/apis                     |
| Fantom    | https://api.ftmscan.com             | https://ftmscan.com/apis                     |
| Hooscan   | https://api.hooscan.com             | https://hooscan.com/apis                     |
| Optimism  | https://api-optimistic.etherscan.io | https://optimistic.etherscan.io/apis         |

# Usage

## Create .env file for Environmental Variables 

- In the root folder, create a new file for the environmental variables called `.env`
- Copy/paste the text below into the `.env` file
- Remove `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` and add the associated *API Key* 
- Save `.env`

````bash
# ADD API KEYS HERE
ETHEREUM_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
AVALANCHE_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
BINANCE_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
HECO_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
CRONOS_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
MOONRIVER_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
MOONBEAM_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
ARBITRUM_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
FANTOM_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
HOOSCAN_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
OPTIMISM_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
````
- The *API keys* above are associated with an array located in `init.js`
```
var chainKey = {
    "keyEthereum": process.env.ETHEREUM_API_KEY,
    "keyAvalanche": process.env.AVALANCHE_API_KEY,
    "keyBinance": process.env.BINANCE_API_KEY,
    "keyHeco": process.env.HECO_API_KEY,
    "keyCronos": process.env.CRONOS_API_KEY,
    "keyMoonriver": process.env.MOONRIVER_API_KEY,
    "keyMoonbeam": process.env.MOONBEAM_API_KEY,
    "keyArbitrum": process.env.ARBITRUM_API_KEY,
    "keyFantom": process.env.FANTOM_API_KEY,
    "keyHooscan": process.env.HOOSCAN_API_KEY,
    "keyOptimism": process.env.OPTIMISM_API_KEY
}
``` 

# Installation
## npm
```
npm i @vondas/loupe
```

## Source
```
git clone [this repository]
cd [repository]
npm i
```

# Usage
```
//Load express module with `require` directive
let dotenv_module;
dotenv_module = require("dotenv");
dotenv_module.config();

const loupe = require('./lib/loupe');

const blockchains = ['ethereum', 'avalanche', 'binance', 'heco', 'cronos', 'moonriver', 'moonbeam', 'arbitrum', 'fantom', 'hooscan', 'optimism'];
const blockchain = blockchains[1];
const contract_address = '0x6cddb55d0ac3204a0bc4f3e3eb03407b1ad59e5c';
console.log(blockchain, contract_address);
loupe.getSmartContracts(blockchain, contract_address);
```
