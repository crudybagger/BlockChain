# BlockChain
A minimalistic node package that allows you to build your own Blockchain


# Installation
The package can be installed via [Node Package Manager (npm)](https://www.npmjs.com/)
use ` npm i blockchain-sha256 ` and you are good to go.

Checkout the package at [npm website](https://www.npmjs.com/package/blockchain-sha256)


# Usage
The package comes with various functions to create your own blockchain and can be used in potentally any application of such setup.

## Configuring the difficulty of mining
use the property ` powDifficulty ` to change the number of zeroes as the prefix of the hash for a valid block
The minimalistic nature of the package allows for the difficulty to be the only configurable parameter.

## Creating Blocks in the Chain
A chain is implemented as a javascript array and is to be initialized by the user.
` let chain = [] `
Now we have a place to keep our blocks, The first ever block in the BlockChain is called a genisis block, and is special
as it has no prevous block's hash. Thus we do not add any  data to it for simplicity sake (The block by default has the data of a string "Genesis Block").
` generateGenesisBlock() ` does not take any parameters and returns the genisis block.

The 'Block' is a JavaScript Object with `data` and `timestamp` as some of the useful properties.
To add further blocks, the function ` addBlock(chain, data) ` is supposed to be used. It takes the global chain array as the first input and the data to be added to the block as next input and appends the block to the `chain` with the set difficulty.