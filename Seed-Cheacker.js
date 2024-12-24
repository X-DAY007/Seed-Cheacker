import axios from 'axios';
import { ethers } from 'ethers';
import fs from 'fs';
import cron from 'node-cron';
import chalk from 'chalk'; // For colored console output
import readline from 'readline'; // For handling user input
import os from 'os';

// Clear the terminal
console.clear();

// Function to display the logo
const logo = `
\x1b[92;1m
     ─────█─▄▀█──█▀▄─█─────
     ────▐▌──────────▐▌────
     ────█▌▀▄──▄▄──▄▀▐█────
     ───▐██──▀▀──▀▀──██▌───
     ──▄████▄──▐▌──▄████▄──
     \x1b[33m-----------------------
       ➣ Telegram : @xss_id
     -----------------------
\x1b[0m
`;

// Function to fetch active IDs
async function fetchActiveIDs() {
  const url =
    'https://raw.githubusercontent.com/X-DAY007/seedactivitekey/refs/heads/master/activeid.txt';

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('\x1b[91mError fetching the active ID list:\x1b[0m', error.message);
    return null;
  }
}

// Function to handle login
async function login() {
  const uuid = os.userInfo().uid + os.userInfo().username;
  const id = uuid + uuid;

  console.log('\x1b[34;1m──────────────────────────────────────────');
  console.log(`\x1b[35;1mYOUR ID: \x1b[97m${id}`);
  console.log('\x1b[34;1m──────────────────────────────────────────\x1b[0m');

  const activeIDs = await fetchActiveIDs();

  if (activeIDs === null) {
    console.log('\x1b[91mUnable to verify ID. Please try again later.\x1b[0m');
    process.exit(1);
  }

  if (activeIDs.includes(id)) {
    console.log(logo);
    console.log('\x1b[92;1mYOUR ID IS ACTIVE.........\x1b[0m');
    return true; // Proceed to the tool
  } else {
    console.log(
      '\x1b[91mID is not active. Contact: \x1b[96m@xss_id... \x1b[91mfor activation.\x1b[0m'
    );
    console.log(logo);
    process.exit(1);
  }
}

// Main functionality of the tool
function mainTool() {
  console.log('\x1b[96mWelcome to the Tool! Running your functionality now...\x1b[0m');
  
  // Add your tool's core functionality here
  console.log('\x1b[93m[+] Tool is working...\x1b[0m');
  // Example placeholder code
  
  

// API Keys and URLs
const ETH_API_URL = 'https://api.etherscan.io/api';
const BASESCAN_API_URL = 'https://api.basescan.org/api';
const ARBISCAN_API_URL = 'https://api.arbiscan.io/api';
const SNOWSCAN_API_URL = 'https://api.snowscan.xyz/api';
const OPTIMISTIC_API_URL = 'https://optimistic.etherscan.io/api';
const SCROLLSCAN_API_URL = 'https://api.scrollscan.com/api';
const BSC_API_URL = 'https://api.bscscan.com/api';

// Provided API Keys
const ETH_API_KEY = '9BCHPHZD9G8R3XHH1ITIFD3KD2MZYYJY1K';
const BASESCAN_API_KEY = 'YB5IK5XVDZ4U1YBPEB4UJNI4RPH7WKNZW9';
const ARBISCAN_API_KEY = '4YMTNUERYWHCG2PBEY2J47KTGFK2HWN3SH';
const SNOWSCAN_API_KEY = 'C2YI5E1X6RU68CBVH74GFWWTGXFMECBV65';
const OPTIMISTIC_API_KEY = 'HEQV6WUHG6SXYCZXSPUEMU49ECXP2CDR2Q';
const SCROLLSCAN_API_KEY = '7J7JN57KDPE2J7K3TWTI43X72Q6IB2I5KM';
const BSC_API_KEY = 'VRDDAVYSUA7UNCSN9YTYZI9W2I4PQDHUTX'; // BSCScan API Key

// Tracking variables
let foundCount = 0;
let checkedCount = 0;

// Cumulative balance sums
let ethSum = 0, baseSum = 0, arbiSum = 0, snowSum = 0, OptimismSum = 0, scrollSum = 0, bscSum = 0;
let maxBalance = 0;

// Helper function to get balance for a specific address and chain
async function getBalance(address, chain) {
    try {
        let balance = '0';
        let tokens = [];

        switch (chain) {
            case 'ethereum':
                const ethResponse = await axios.get(ETH_API_URL, {
                    params: {
                        module: 'account',
                        action: 'balance',
                        address: address,
                        tag: 'latest',
                        apikey: ETH_API_KEY
                    }
                });
                balance = ethers.utils.formatEther(ethResponse.data.result);
                if (parseFloat(balance) < 0.002) {
                    balance = '0'; // Avoid displaying very small balances
                }
                tokens = await getERC20Tokens(address, 'ethereum');
                break;

            case 'basescan':
                const baseResponse = await axios.get(BASESCAN_API_URL, {
                    params: {
                        module: 'account',
                        action: 'balance',
                        address: address,
                        tag: 'latest',
                        apikey: BASESCAN_API_KEY
                    }
                });
                balance = ethers.utils.formatEther(baseResponse.data.result);
                if (parseFloat(balance) < 0.002) {
                    balance = '0'; // Avoid displaying very small balances
                }
                tokens = await getERC20Tokens(address, 'basescan');
                break;

            case 'arbiscan':
                const arbiResponse = await axios.get(ARBISCAN_API_URL, {
                    params: {
                        module: 'account',
                        action: 'balance',
                        address: address,
                        tag: 'latest',
                        apikey: ARBISCAN_API_KEY
                    }
                });
                balance = ethers.utils.formatEther(arbiResponse.data.result);
                if (parseFloat(balance) < 0.002) {
                    balance = '0'; // Avoid displaying very small balances
                }
                tokens = await getERC20Tokens(address, 'arbiscan');
                break;

            case 'snowscan':
                const snowResponse = await axios.get(SNOWSCAN_API_URL, {
                    params: {
                        module: 'account',
                        action: 'balance',
                        address: address,
                        tag: 'latest',
                        apikey: SNOWSCAN_API_KEY
                    }
                });
                balance = ethers.utils.formatEther(snowResponse.data.result);
                if (parseFloat(balance) < 0.002) {
                    balance = '0'; // Avoid displaying very small balances
                }
                tokens = await getERC20Tokens(address, 'snowscan');
                break;

            case 'Optimism':
                const OptimismResponse = await axios.get(OPTIMISTIC_API_URL, {
                    params: {
                        module: 'account',
                        action: 'balance',
                        address: address,
                        tag: 'latest',
                        apikey: OPTIMISTIC_API_KEY
                    }
                });
                balance = ethers.utils.formatEther(OptimismResponse.data.result);
                if (parseFloat(balance) < 0.002) {
                    balance = '0'; // Avoid displaying very small balances
                }
                tokens = await getERC20Tokens(address, 'Optimism');
                break;

            case 'scrollscan':
                const scrollResponse = await axios.get(SCROLLSCAN_API_URL, {
                    params: {
                        module: 'account',
                        action: 'balance',
                        address: address,
                        tag: 'latest',
                        apikey: SCROLLSCAN_API_KEY
                    }
                });
                balance = ethers.utils.formatEther(scrollResponse.data.result);
                if (parseFloat(balance) < 0.002) {
                    balance = '0'; // Avoid displaying very small balances
                }
                tokens = await getERC20Tokens(address, 'scrollscan');
                break;

            case 'bsc': // BNB Smart Chain
                const bscResponse = await axios.get(BSC_API_URL, {
                    params: {
                        module: 'account',
                        action: 'balance',
                        address: address,
                        tag: 'latest',
                        apikey: BSC_API_KEY
                    }
                });
                balance = ethers.utils.formatEther(bscResponse.data.result);
                if (parseFloat(balance) < 0.002) {
                    balance = '0'; // Avoid displaying very small balances
                }
                tokens = await getERC20Tokens(address, 'bsc');
                break;

            default:
                console.error(`Unsupported chain type: ${chain}`);
        }

        return { balance, tokens };
    } catch (error) {
        console.error(`Error getting balance for ${address} on ${chain}: ${error.message}`);
        return { balance: '0', tokens: [] };
    }
}


// Helper function to get ERC-20 token holdings
async function getERC20Tokens(address, chain) {
    let tokens = [];
    try {
        let url;
        let params = {
            module: 'account',
            action: 'tokentx',
            address: address,
            apikey: '',
            startblock: 0,
            endblock: 99999999
        };

        switch (chain) {
            case 'ethereum':
                url = ETH_API_URL;
                params.apikey = ETH_API_KEY;
                break;

            case 'basescan':
                url = BASESCAN_API_URL;
                params.apikey = BASESCAN_API_KEY;
                break;

            case 'arbiscan':
                url = ARBISCAN_API_URL;
                params.apikey = ARBISCAN_API_KEY;
                break;

            case 'snowscan':
                url = SNOWSCAN_API_URL;
                params.apikey = SNOWSCAN_API_KEY;
                break;

            case 'Optimism':
                url = OPTIMISTIC_API_URL;
                params.apikey = Optimism_API_KEY;
                break;

            case 'scrollscan':
                url = SCROLLSCAN_API_URL;
                params.apikey = SCROLLSCAN_API_KEY;
                break;

            case 'bsc':
                url = BSC_API_URL;
                params.apikey = BSC_API_KEY;
                break;

            default:
                throw new Error(`Unsupported chain for token check: ${chain}`);
        }

        const response = await axios.get(url, { params });
        const tokenData = response.data.result || [];

        tokenData.forEach((token) => {
            tokens.push({
                name: token.tokenName,
                symbol: token.tokenSymbol,
                balance: ethers.utils.formatUnits(token.value, token.tokenDecimal),
            });
        });
    } catch (error) {
        console.error(`Error getting token data for ${address} on ${chain}: ${error.message}`);
    }
    return tokens;
}

// Function to derive wallet address from seed for Ethereum-compatible chains
function deriveAddress(seed) {
    try {
        const wallet = ethers.Wallet.fromMnemonic(seed);
        return wallet.address;
    } catch (error) {
        console.error(`Error deriving address from seed: ${seed} | Error: ${error.message}`);
        return null;
    }
}

// Function to display balances
// Helper function to format balances, avoiding scientific notation
function formatBalance(balance) {
    const parsedBalance = parseFloat(balance);
    return parsedBalance < 0.00000001 ? '0' : parsedBalance.toFixed(18); // Show in full precision if greater than 0
}

// Function to display balances and token holdings found
function displayBalances(eth, base, arbi, snow, Optimism, scroll, bsc, totalTokensFound) {
    console.log(
        `⎮ETH:${formatBalance(eth)} ` +
        `BASE:${formatBalance(base)} ` +
        `ARBI:${formatBalance(arbi)} ` +
        `SNOW:${formatBalance(snow)} ` +
        `OPT:${formatBalance(Optimism)} ` +
        `SCROLL:${formatBalance(scroll)} ` +
        `BSC:${formatBalance(bsc)}⎮ ` +
        `FOUND: ${foundCount} CHECKED: ${checkedCount}`
    );
    console.log(`Total-token-Holdings-found: ${totalTokensFound}`);
}

// Function to log found balances to found.txt
function logFoundBalances(seed, address, chain, balance, tokens) {
    let logEntry = false;

    // Log the chain balance if it's greater than 0
    if (parseFloat(balance) > 0) {
        logEntry = true;
        fs.appendFileSync(
            'found.txt',
            `Seed: ${seed}\nAddress: ${address}\nChain: ${chain}\nBalance: ${formatBalance(balance)} ${chain.toUpperCase()}\n`
        );
    }

    // Check for tokens with non-zero balances
    let hasNonZeroToken = false;
    tokens.forEach((token) => {
        if (parseFloat(token.balance) > 0) {
            hasNonZeroToken = true;
            if (!logEntry) {
                logEntry = true;
                fs.appendFileSync(
                    'found.txt',
                    `Seed: ${seed}\nAddress: ${address}\nChain: ${chain}\nBalance: 0 ${chain.toUpperCase()}\n`
                );
            }
            fs.appendFileSync(
                'found.txt',
                `Token: ${token.name} | Symbol: ${token.symbol} | Balance: ${formatBalance(token.balance)}\n`
            );
        }
    });

    // If neither chain balance nor token balance is non-zero, do not log anything
    if (logEntry) {
        fs.appendFileSync('found.txt', '---------------------------------------------------\n');
    }
}


// Function to read old seeds
function readOldSeeds() {
    if (fs.existsSync('old.txt')) {
        return new Set(fs.readFileSync('old.txt', 'utf-8').split('\n').map(seed => seed.trim()).filter(Boolean));
    }
    return new Set();
}

// Function to save new seeds to old.txt
function saveOldSeeds(seeds) {
    fs.appendFileSync('old.txt', seeds.join('\n') + '\n');
}


// Function to check balances for all chains
async function checkBalances(seedPhrases) {
    const oldSeeds = readOldSeeds();
    const newSeeds = seedPhrases.filter(seed => !oldSeeds.has(seed));
    let totalTokensFound = 0; // To count total token holdings found

    for (let seed of newSeeds) {
        const coins = ['ethereum', 'basescan', 'arbiscan', 'snowscan', 'Optimism', 'scrollscan', 'bsc'];

        for (let coin of coins) {
            const address = deriveAddress(seed);
            if (!address) continue;

            const { balance, tokens } = await getBalance(address, coin);

            logFoundBalances(seed, address, coin, parseFloat(balance), tokens);

            // Calculate the number of tokens found
            totalTokensFound += tokens.filter(token => parseFloat(token.balance) > 0).length;

            checkedCount++;
            displayBalances(ethSum, baseSum, arbiSum, snowSum, OptimismSum, scrollSum, bscSum, totalTokensFound);
        }
    }

    saveOldSeeds(newSeeds);
}



// Function to generate unique new seeds
function generateUniqueSeeds(count, oldSeeds) {
    const newSeeds = [];
    while (newSeeds.length < count) {
        const seed = ethers.Wallet.createRandom().mnemonic.phrase;
        if (!oldSeeds.has(seed)) {
            newSeeds.push(seed);
        }
    }
    return newSeeds;
}

// Prompt user for input
function promptUser() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question('1. Enter file seed for checking\n2. Automatically generate seeds and check\nChoose an option: ', (option) => {
        const oldSeeds = readOldSeeds();

        if (option === '1') {
            rl.question('Enter seed file path: ', (filePath) => {
                if (fs.existsSync(filePath)) {
                    const seedPhrases = fs.readFileSync(filePath, 'utf-8').split('\n').map(seed => seed.trim()).filter(Boolean);
                    checkBalances(seedPhrases);
                } else {
                    console.error('File does not exist. Exiting.');
                }
                rl.close();
            });
        } else if (option === '2') {
            rl.question('Enter the number of seeds to generate: ', (numSeeds) => {
                const seedPhrases = generateUniqueSeeds(parseInt(numSeeds), oldSeeds);
                checkBalances(seedPhrases);
                rl.close();
            });
        } else {
            console.error('Invalid option. Exiting.');
            rl.close();
        }
    });
}

// Start script
promptUser();

  
  
  setTimeout(() => {
  }, 3000);
}

// Run the login process first, then the tool
(async function () {
  const isLoggedIn = await login();
  if (isLoggedIn) {
    mainTool();
  }
})();