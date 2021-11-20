const SHA256 = require("sha256");
module.exports = {
    powDifficulty : 7, 
    calculateHash : function ({previousHash, timestamp, data, nonce = 1}) {
        return SHA256(previousHash + timestamp + JSON.stringify(data) +  nonce).toString();
    },

    generateGenesisBlock : function () {
        const block = {
          timestamp:     +new Date(),
          data:         "Genesis Block",
          previousHash: "0",
        };
        return {
          ...block,
          hash: this.calculateHash(block)
        }
    },
    checkDifficulty : function (difficulty, hash) {
        return hash.substr(0, difficulty) === "0".repeat(difficulty)
    },
    nextNonce: function (block) {
        return this.updateHash({ ...block, nonce: block.nonce + 1 })
    },
    updateHash : function (block) {
        return { ...block, hash: this.calculateHash(block) }
    },
    mineBlock : function (difficulty, block) {
        var newBlock = this.nextNonce(block);
        while(!this.checkDifficulty(difficulty, newBlock.hash)){
            newBlock = this.nextNonce(newBlock);
        }
        return newBlock;
    },
    addBlock : function (chain, data) {
        const pblock = chain[chain.length - 1];
        const previousHash = pblock.hash;
        const block                  = { timestamp: + new Date(), data, previousHash, nonce: 0 }
        const newBlock               = this.mineBlock(this.powDifficulty, block);
        return chain.concat(newBlock);
    },
    validateChain : function (chain) {
        function tce(chain, index) {
          if (index === 0) return true;
          const { hash, ...currentBlockWithoutHash } = chain[index];
          const currentBlock                         = chain[index];
          const previousBlock                        = chain[index - 1];
          const isValidHash         = (hash === this.calculateHash(currentBlockWithoutHash));
          const isPreviousHashValid = (currentBlock.previousHash === previousBlock.hash);
          const isValidChain        = (isValidHash && isPreviousHashValid);
      
          if (!isValidChain) return false;
          else return tce(chain, index -1);
        }
        return tce(chain, chain.length - 1);
    },
    setDifficulty : function(d) {
        this.powDifficulty = d;
    }
}