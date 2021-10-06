const SHA256 = require("sha256");
var crypto = require("./crypto");

var block = crypto.generateGenesisBlock();
crypto.setDifficulty(4);
var blockChain = [block];
// blockChain = crypto.addBlock(blockChain, 2);
for(var i = 0; i < 10; i++){
    blockChain = crypto.addBlock(blockChain, i);
    console.log("minning block #" + i);
}

console.log(blockChain);

