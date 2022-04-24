/**
 * loupe.js
 * @author Christopher Konopka
 * @description Create "core" packet of data via Smart Contract address
 * @param {string} contract - Smart Contract address.
 * @param {string} blockchain - Selected blockchain.
 */

module.exports = function(blockchain, contract_address) {

    /** 
     * @global variables
     */
    var globalTxHashArray = [];
    var globalBlockArray = [];
    var globalObjArray = [];
    var txGlobalESD = [];
    var globalABI;
    var rugDir;
    var folderSlug;
    var globalABI;
    var globalRug;
    var globalABI;
    var globalContractAddress = './Schmibrary/' + blockchain + '/' + contract_address;
    var globalContractSymbol;
    var globalProcessTimestamps = [];
    var globalSolidityFiles = [];
    var globalMiniFiles = [];
    var globalMiniFiles2222 = [];

    /**
     * @global libraries
     */
    const fs = require("fs");
    const path = require('path');
    const request = require("request");
    const execShPromise = require("exec-sh").promise;
    const execSh = require("exec-sh");

    /** 
     * @module dotenv 
     * @description 
     */
    var dotenv_module;
    dotenv_module = require("dotenv");
    dotenv_module.config();

    /** 
     * @module web3 
     * @description 
     */
    const Web3 = require("web3");
    const web3 = new Web3(
        new Web3.providers.HttpProvider(process.env.INFURA_ADDRESS_ETH)
    );

    /** 
     * @module abi-decoder
     * @description 
     */
    const abiDecoder = require("abi-decoder"); // NodeJS

    /** 
     * @module axios
     * @description 
     */
    const axios = require("axios");

    /** 
     * @module viewfinder 
     * @description 
     * */
    var api = require("@vondas/viewfinder").init(blockchain);
    console.log(api);

    /**
     * @name gameWatch
     * @function 
     * @description Unit for logging stack messages
     * @param {string} type     Pass process type (ie. FUNCTION, ACTION, WRITE)
     * @param {string} process  Describe the process
     */
    function gameWatch(type, process) {
        let uxts = Date.now();
        console.log(uxts, type + " - " + process);
    }

    /**
     * @name asyncCreateRoots
     * @function 
     * @description
     */
    async function asyncCreateRoots() {
        return new Promise((resolve) => {
            setTimeout(() => resolve("asyncCreateRoots is done!"), 500);
        });
    }

    /**
     * @name createRoots
     * @function 
     * @description
     */
    function createRoots(blockchain, contract_address) {
        gameWatch("FUNCTION", "createRoots");
        rootSchmibrary = "./Schmibrary/";
        rootSchmibraryBlockchain = "./Schmibrary/" + blockchain;
        rootSmartContract = "./Schmibrary/" + blockchain + "/" + contract_address + "/";
        if (!fs.existsSync(rootSchmibrary)) {
            gameWatch("CREATE", "Schmibrary root");
            fs.mkdirSync(rootSchmibrary);
        } else {
            gameWatch("PASS", "Schmibrary root EXISTS");
        }
        if (!fs.existsSync(rootSchmibraryBlockchain)) {
            gameWatch("CREATE", "Schmibrary/Blockchain root");
            fs.mkdirSync(rootSchmibraryBlockchain);
        } else {
            gameWatch("PASS", "Schmibrary/Blockchain EXISTS");
        }
        if (!fs.existsSync(rootSmartContract)) {
            gameWatch("CREATE", "Smart Schmibrary/Blockchain/Contract root");
            fs.mkdirSync(rootSmartContract);
        } else {
            gameWatch("PASS", "Schmibrary/Blockchain/Contract root EXISTS");
        }
        rugDir = "./Schmibrary/" + blockchain + "/" + contract_address + "/";
        globalRug = rugDir + contract_address + "-core_logs.json";
    }

    /**
     * @name asyncVerifySmartContract
     * @function 
     * @description
     */
    async function asyncVerifySmartContract() {
        return new Promise((resolve) => {
            setTimeout(() => resolve("extractionProcess is done!"), 2500);
        });
    }

    function saveUnverifiedBytecode(unverified) {
        gameWatch("RESPONSE", "WRITE - UNVERIFIED - BYTECODE");
        let saveBytecode = "./Schmibrary/" + blockchain + "/" + contract_address + "/" + contract_address + "-bytecode.json";
        fs.writeFileSync(saveBytecode, JSON.stringify(unverified.result));
    }

    // function saveUnverifiedBytecodeAnalysis(unverified) {
    //     gameWatch("RESPONSE", "WRITE - UNVERIFIED - BYTECODE ANALYSIS");
    //     let saveLocation = "./Schmibrary/" + blockchain + "/" + contract_address + "/" + contract_address + "";
    //     let cmd = 'sh ./lib/evm.sh ' + JSON.stringify(unverified.result) + ' ' + saveLocation;
    //     console.log(cmd);
    //     // let arr = [];
    //     const child = execSh(cmd, true, (err, stdout, stderr) => {
    //         console.log(stdout);
    //     });
    // }

    function saveVerifiedContract(unverified) {
        gameWatch("RESPONSE", "WRITE - VERIFIED - CONTRACT");
        let saveLocation = "./Schmibrary/" + blockchain + "/" + contract_address + "/" + contract_address + ".sol";
        fs.writeFileSync(saveLocation, res.result[0].SourceCode);
        passGlobalFunction("./Schmibrary/" + blockchain + "/" + contract_address + "/" + contract_address);
    }

    /**
     * @name verifySmartContract
     * @function 
     * @description
     */
    function verifySmartContract(blockchain, contract_address) {
        let res2 = api.contract.getsourcecode(contract_address);
        res2
            .then(function(res) {
                gameWatch("RESPONSE", "Etherscan - getsourcecode");
                if (res.result[0].ABI === 'Contract source code not verified') {
                    gameWatch("RESPONSE", "Contract - UNVERIFIED");
                    if (blockchain == 'ethereum' || blockchain == 'avalanche' || blockchain == 'binance' || blockchain == 'fantom') {
                        gameWatch("RESPONSE", "Contract - UNVERIFIED - " + blockchain);
                        let getCode = web3.eth.getCode(contract_address);
                        let bytecode;
                        let res = api.proxy.eth_getCode(contract_address, 'latest');
                        res.then(function(unverified) {
                            console.log(unverified);
                            saveUnverifiedBytecode(unverified);
                            // saveUnverifiedBytecodeAnalysis(unverified);
                        })
                    } else {
                        gameWatch("RESPONSE", "Contract - UNVERIFIED - wrong blockchain");
                    }
                } else {
                    gameWatch("RESPONSE", "Contract - VERIFIED");
                    let saveLocation = "./Schmibrary/" + blockchain + "/" + contract_address + "/" + contract_address + ".sol";
                    gameWatch("RESPONSE", "Contract - Save");
                    console.log(saveLocation);
                    fs.writeFileSync(saveLocation, res.result[0].SourceCode);
                    console.log(saveLocation);
                    passGlobalFunction("./Schmibrary/" + blockchain + "/" + contract_address + "/" + contract_address);
                }
                return res
            }).catch(function(err) {
                console.log(err);
            });
    }

    function passGlobalFunction(location) {
        globalContractAddress = location;
    }

    async function asyncExtraction() {
        return new Promise((resolve) => {
            setTimeout(() => resolve("asyncExtraction is done!"), 5000);
        });
    }

    function extractContractInformation(blockchain, contracts) {
        gameWatch('ACTION', 'extractContractInformation');
        gameWatch('ACTION', 'READ NESTED SOLIDITY FILE');
        fs.readFile(globalContractAddress + '.sol', "utf8", (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err);
                return;
            }
            const jsonStr = JSON.stringify(jsonString);
            if (jsonStr.includes('language')) {
                try {
                    const json = JSON.parse(jsonStr);
                    let restructedJSON = json.slice(1, json.length - 1);
                    let newJSON = `{"results":[` + restructedJSON + `]}`;

                    extractNestedJsonSolidity(newJSON, globalContractAddress);
                    let data = JSON.parse(newJSON);
                    let kk = data[Object.keys(data)[0]][0];
                    let sourcecode = Object.keys(data.results[0].sources);

                    for (let x = 0; x < sourcecode.length; x++) {
                        let contractName = sourcecode[x];
                        let solidityFile = kk.sources[contractName].content;
                        const parsedContract = contractName.replace(new RegExp('\/', 'g'), '-');
                        let newFile = globalContractAddress + parsedContract;
                        fs.writeFileSync(newFile, solidityFile);
                    }
                } catch (e) {
                    console.log(e);
                } finally {
                    globalMiniFiles = [];
                    console.log(globalContractAddress);
                    // const directoryPath = path.join(__dirname, './Schmibrary/' + blockchain + '/' + contracts);
                    fs.readdir('./Schmibrary/' + blockchain + '/' + contracts, function(err, files) {
                        if (err) {
                            return console.log('Unable to scan directory: ' + err);
                        }
                        files.forEach(function(file) {
                            var ext = path.extname(file);
                            switch (ext) {
                                case '.json':
                                    // console.log('json');
                                    break;
                                case '.DS_Store':
                                    // console.log('store');
                                    break;
                                case '.sol':
                                    // console.log('solidity');
                                    globalMiniFiles.push(file);
                                    break;
                                default:
                                    // console.log('default');
                            }
                        });
                        const directoryPathSolidity = './Schmibrary/' + blockchain + '/' + contracts + '/' + contracts + '-solidity';
                        if (!fs.existsSync(directoryPathSolidity)) {
                            fs.mkdirSync(directoryPathSolidity);
                        } else {}

                        editSolidityFiles(blockchain, globalMiniFiles, contracts, directoryPathSolidity);
                    });
                }
            } else {
                const directoryPath = path.join(__dirname, './Schmibrary/' + blockchain + '/' + contracts);
                fs.readdir(directoryPath, function(err, files) {
                    if (err) {
                        return console.log('Unable to scan directory: ' + err);
                    }
                    files.forEach(function(file) {
                        globalMiniFiles.push(file);
                        editSolidityFiles(blockchain, globalMiniFiles, contracts)
                    });
                });
            }
        });
        gameWatch("TIMESTAMP-END", "END");
    }

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    function editSolidityFiles(blockchain, files, contract, directoryPathSolidity) {
        const doSomething = async() => {
            await sleep(100);
            try {
                if (files.length == 1) {
                    gameWatch("RESPONSE", "SINGLE SOLIDITY CONTRACT");
                    console.log(files[0]);
                } else {
                    gameWatch("RESPONSE", "MULTIPLE SOLIDITY CONTRACT");
                    for (let g = 0; g < files.length; g++) {
                        if (files[g] == contract + '.sol') {} else {
                            let splitter = files[g];
                            const directoryPath2 = './Schmibrary/' + blockchain + '/' + contract + '/' + splitter;
                            let string = files[g].split("-");
                            let len = string.length;
                            let newFilename = string[0] + "-" + string[len - 1]

                            await sleep(50);

                            fs.readFile(directoryPath2, function(err, data) {
                                if (err) throw err;
                                var array = data.toString().split("\n");

                                var array2 = [];
                                for (i in array) {
                                    array2.push(array[i]);
                                }
                                let insertLink = directoryPathSolidity + '/' + string[len - 1];
                                writeLocalizedSolidityFiles(array2, insertLink, contract);
                            })
                        }
                    }
                }
            } catch (err) {
                console.error(err)
            }
        }
        doSomething()
    }

    function writeLocalizedSolidityFiles(array, filename, contract) {
        let array2 = [];
        let newFilename;
        for (let i = 0; i < array.length; i++) {
            if (array[i].includes("import")) {
                let string = array[i].split("/");
                let len = string.length;
                array[i] = "";
                let newImport = 'import ' + '"./' + string[len - 1];
                array2.push(newImport);
            } else {
                array2.push(array[i]);
            }
        }
        gameWatch("WRITE", "NEW LOCAL SOLIDITY FILES");
        const writeStream = fs.createWriteStream(filename);
        const pathName = writeStream.path;
        array2.forEach(value => writeStream.write(`${value}\n`));

        writeStream.on('finish', () => {
            gameWatch("WRITE", "CONTRACT - " + pathName);
        });

        writeStream.on('error', (err) => {
            console.error(`There is an error writing the file ${pathName} => ${err}`)
        });

        writeStream.end();
        array2 = [];
    }

    /**
     * @name extractNestedJsonSolidity
     * @function 
     * @description Save nestted JSON Solidity file as .json
     * @params {string} address - Smart Contract address
     * @params {string} contracts - Smart Contract content
     */
    function extractNestedJsonSolidity(contracts, address) {
        gameWatch('ACTION', 'extractNestedJsonSolidity');
        let extract = JSON.parse(contracts);
        let savedAddress = address + "-nested.json";

        let obj = {};
        obj = extract;
        let data = JSON.stringify(obj);
        fs.writeFileSync(savedAddress, data);
    }

    gameWatch("LOUPE", "START");
    asyncCreateRoots().then((thing1) => {
        gameWatch("ACTION", "asyncCreateRoots");
        createRoots(blockchain, contract_address);
    });
    asyncVerifySmartContract().then((thing2) => {
        gameWatch("ACTION", "verifySmartContract");
        verifySmartContract(blockchain, contract_address);
    });
    asyncExtraction().then((thing2) => {
        gameWatch("ACTION", "extraction");
        extractContractInformation(blockchain, contract_address);
    });
}