const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.caculateHash();
        this.nonce = 0; // changed in order to change hash value
    }

    caculateHash() {
        return SHA256(
            this.index +
            this.previousHash +
            this.timestamp +
            JSON.stringify(this.data) +
            this.nonce
        ).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.startsWith("0".repeat(difficulty))) {
            this.nonce ++;
            this.hash = this.caculateHash();
        }

        console.log(`Block mined: ${this.hash}`);
    }
}

class BlockChain {
    constructor() {
        this.chain = [ this.createGenesisBlock() ];
        this.difficulty = 10;
    }

    createGenesisBlock() {
        return new Block(0, "02/12/2023", { name: "Genesis block" }, "0");
    }

    getLastestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.caculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

const pewCoin = new BlockChain();

console.log("Mining block 1...");
pewCoin.addBlock(new Block(
    index=1,
    timestamp="5/12/2023",
    data={
        name: "transaction",
        from: "A",
        to: "B",
        amount: "100$"
    }
));

console.log("Mining block 2...");
pewCoin.addBlock(new Block(
    index=1,
    timestamp="7/12/2023",
    data={
        name: "transaction",
        from: "A",
        to: "B",
        amount: "500$"
    }
));

console.log("PewCoin: ", JSON.stringify(pewCoin, null, 4));
console.log('Is blockchain valid ?: ', pewCoin.isChainValid());