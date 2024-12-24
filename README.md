
# Multi-Blockchain Wallet Balance Checker

This tool allows users to check balances for a variety of blockchains using provided API keys. The supported blockchains are Ethereum, BSC (Binance Smart Chain), Arbitrum, SnowTrace, Optimism, Scroll, and Base.

## Features

- **Check Wallet Balances:** Supports multiple blockchains including Ethereum, BSC, Arbitrum, SnowTrace, and others.
- **ERC-20 Token Support:** Checks balances for both native coins and ERC-20 tokens.
- **User Authentication:** Requires an active user ID for authentication before accessing the tool's functionality.
- **Balance Logging:** Logs balances and tokens found in `found.txt`.
- **Error Handling:** Handles various errors that might occur while checking balances or fetching data from APIs.
- **Cron Jobs:** Set periodic balance checks using cron scheduling.

# Termux ID Activation

This project requires activating your Termux ID to get started. Follow the instructions below to activate your Termux ID and connect it to the system.

## Steps to Activate Your Termux ID

1. **Obtain Your Termux ID:**
   - Open your Termux app and run the following command to get your Termux ID:
     ```bash
     termux-id
     ```

2. **Send Your Termux ID to the Telegram Bot:**
   - Send your Termux ID to the following Telegram bot for activation:
     - **Telegram Bot:** [@xss_id](https://t.me/xss_id)
     - In your Telegram, search for `@xss_id` and send your Termux ID as a message.

3. **Wait for Confirmation:**
   - Once you send your Termux ID, the bot will process it and send a confirmation message when your ID is successfully activated.

4. **Start Using the Tool:**
   - After activation, you can use the project as intended in your Termux environment.

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm (or yarn)
- Access to the following blockchain APIs:
  - Etherscan
  - BSCScan
  - Arbiscan
  - SnowScan
  - Optimistic Ethereum
  - ScrollScan
  - BaseScan

### Clone the repository

```bash
git clone https://github.com/X-DAY007/multi-blockchain-balance-checker.git
cd multi-blockchain-balance-checker
```

### Install dependencies

```bash
npm install
npm install axios web3 ethers bitcoinjs-lib solana-web3.js dotenv
```

## Configuration

### API Keys
In the code, you will find predefined API keys for various blockchain explorers like Etherscan, BSCScan, etc. If you prefer to use your own keys, you can replace them in the code.


### User Authentication
When running the tool, you will be asked to authenticate with a unique ID. The list of active IDs is fetched from a remote file. You must have an active ID to use the tool.

### Log Files
- **`found.txt`**: Stores wallet address, balance, and token information for wallets that have a non-zero balance.
- **`old.txt`**: Stores previously checked seeds to avoid rechecking them.

## Usage

### Running the Tool

```bash
node Seed-Cheacker.js
```

Upon successful login, the tool will start checking the wallet balances for all addresses in the provided seed list and log the results in the `found.txt` file.

### Check Balances for Specific Wallets

The tool will automatically check balances for each wallet derived from a 12-word seed. For each blockchain, the balance is fetched, and token data is retrieved. If a wallet has a balance greater than 0, the tool logs the information in the `found.txt` file.

### Example Output

```plaintext
ETH: 1.2345 BNB: 0.0567 ARBI: 2.3456 SNOW: 0.0001 ...
FOUND: 5 CHECKED: 50
Total-token-Holdings-found: 10
```

## Scheduled Task (Cron Jobs)

You can use cron jobs to run the tool periodically at specific intervals.

```bash
node-cron.schedule('0 0 * * *', () => {
  console.log('Running the balance checker at midnight every day');
  mainTool();
});
```

## Contributing

Feel free to fork the repository and contribute. If you encounter any issues, open an issue on GitHub, and we will try to resolve it as soon as possible.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
