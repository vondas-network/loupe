/**
 * @name init.js
 * @description Initializes API routes, loads API key environmental variables into memory
 */

/**
 * @global
 */
"use strict";
const loupe = require('./loupe.js');

module.exports = function(chain, contract_address, timeout) {

    if (!timeout) {
        timeout = 10000;
    }
    loupe(chain, contract_address);
};