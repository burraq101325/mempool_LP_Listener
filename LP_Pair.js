// BSC LP Pair Sniffer

const ethers = require('ethers');

const factory = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";


const wss = new ethers.providers.WebSocketProvider("wss://bsc.getblock.io/mainnet/?api_key=5de00e5a-3e07-48f9-8926-59ab9f3abd21");//BSC
// "wss://mainnet.infura.io/ws/v3/f237878ed3164a66a54e3356f2a56939";// ETH

const mnemonic = "glance peanut digital cover sheriff hurry school meadow beef vast grocery drip"
const wallet = ethers.Wallet.fromMnemonic(mnemonic);
const account = wallet.connect(wss)


const factory_ABI = new ethers.Contract(
    factory,
    ['event PairCreated(address indexed token0, address indexed token1, address pair, uint)'],// Human ReadAble ABI
    account
);

factory_ABI.on("PairCreated", async (token0, token1, addressPair) => {
    console.log(`
    -----------------
    LP-Pair Detected
    -----------------
    token0: ${token0}
    token1: ${token1}
    addressPair: ${addressPair}
    `);  
})