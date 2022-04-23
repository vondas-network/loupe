/**
 * @name init.js
 * @description Initializes API routes, loads API key environmental variables into memory
 */

/**
 * @global
 */
"use strict";
const log = require('./loupe.js');

module.exports = function(chain, contract_address, timeout) {

    if (!timeout) {
        timeout = 10000;
    }
    console.log(chain);
    switch (chain) {
        case 'ethereum':
            // case 'eth':
            return {
                log: log(chain, contract_address)
            };
        case 'avalanche':
            // case 'avax':
            return {
                log: log(chain, contract_address)
            };
        default:
            console.log('DEFAULTED');
    }
};