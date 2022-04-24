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