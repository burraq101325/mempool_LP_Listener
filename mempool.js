var ethers = require("ethers");
var Tx = require('ethereumjs-tx').Transaction;
var url = "wss://mainnet.infura.io/ws/v3/f237878ed3164a66a54e3356f2a56939";// ETH
// wss://bsc.getblock.io/mainnet/?api_key=5de00e5a-3e07-48f9-8926-59ab9f3abd21// BSC

var init = function () {
  var customWsProvider = new ethers.providers.WebSocketProvider(url);
  
  customWsProvider.on("pending", (tx) => {
    customWsProvider.getTransaction(tx).then(function (transaction) {
      console.log(transaction);
    });
  });

};

init();