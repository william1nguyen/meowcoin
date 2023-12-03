### HOW TO CREATE A CRYTOCURRENCY

### Transaction
- Basic concept
- **Transaction** include

    *Properties*
    * fromAddress
    * toAddress
    * amount

### Block
- **Block** is a basic node that store information.
- A **block** contain

    *Properties*
    * timestamp
    * transactions (a list of transactions)
    * previousHash (A **block** will store **previous block hash code**).

    ---
    *All Methods*

    - calculateHash()
    - mineBlock(difficulty)

### Blockchain
- **Blockchain** is a chain of multiple blocks.
- In this project, **Blockchain** contain

    *Properties*
    * chain (list of blocks, default is `genesisBlock`).
    * difficulty (difficulty is level of security added for each mining turn. e.x. start with "000").
    * pendingTransactions
    * miningReward (use for rewarding for each **mined block**).

    ---  
    *All Methods*

    - createGenesisBlock()
    - getLastestBlock()
    - minePendingTransactions(miningRewaredAddress)
    - createTransaction(transaction)
    - getBalanceOfAddress(address)
    - isChainValid()