 const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
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

    mineBlock(difficulty) { // for security purposes
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
        this.difficulty = 2;
        this.pendingTransactions = []
        this.miningReward = 100;
    }

    createGenesisBlock() {
        const block = new Block(Date.now(), [], "0");
        return block;
    }

    getLastestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewaredAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log("This block is mined!...");
        this.chain.push(block);

        // receive reward
        this.pendingTransactions = [
            new Transaction(null, miningRewaredAddress, this.miningReward)
        ];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (address === 'vanhpew') {
                    console.log(trans);
                }
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }
                
                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
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