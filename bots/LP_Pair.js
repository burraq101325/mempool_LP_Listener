// BSC LP Pair Sniffer

const ethers = require('ethers');
const data = require('./cfg.json');
const factory = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";


const wss = new ethers.providers.WebSocketProvider(data.wss_BSC);//BSC
// "data.wss_ETH";// ETH

const seedPhrase = data.mnemonic
const wallet = ethers.Wallet.fromMnemonic(seedPhrase);
const account = wallet.connect(wss)


const factory_ABI = new ethers.Contract(
    factory,
    ['event PairCreated(address indexed token0, address indexed token1, address pair, uint)',
    "function symbol() returns (string)"],// Human ReadAble ABI
    account
);

factory_ABI.on("PairCreated", async (token0, token1, addressPair, symbol) => {
    console.log(`
    -----------------
    LP-Pair Detected
    -----------------
    token0: ${token0}
    token1: ${token1}
    addressPair: ${addressPair}
    Symbol: ${factory_ABI.call.getName()}
    `);  
})