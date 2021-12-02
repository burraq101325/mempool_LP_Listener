var ethers = require("ethers");
var Tx = require('ethereumjs-tx').Transaction;
const data = require('./cfg.json');
var url = data.wss_ETH;// ETH
// wss://bsc.getblock.io/mainnet/?api_key=5de00e5a-3e07-48f9-8926-59ab9f3abd21// BSC

var init = function () {
  var customWsProvider = new ethers.providers.WebSocketProvider(url);
  
  customWsProvider.on("pending", (tx) => {
    customWsProvider.getTransaction(tx).then(function (transaction) {
      console.log(transaction);
    });
  });
  customWsProvider._websocket.on("error", async () => {
    console.log(`Unable to connect to ${ep.subdomain} retrying in 3s...`);
    setTimeout(init, 3000);
  });
  customWsProvider._websocket.on("close", async (code) => {
    console.log(
      `Connection lost with code ${code}! Attempting reconnect in 3s...`
    );
    customWsProvider._websocket.terminate();
    setTimeout(init, 3000);
  });
};

init();