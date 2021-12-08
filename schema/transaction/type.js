const {gql} = require('apollo-server-express');


const transactionTypeDefs = gql`
    
    type Transaction {
        id: ID!,
        transactionHash:String,
        transactionIndex:Int,
        blockHash:String,
        blockNumber:Int,
        from:String,
        to:String,
        gasUsed:Int,
        cumulativeGasUsed:Int,
        contractAddress:String,
        status:Boolean,
        value:String,
        nonce:Int,
        gasPrice:String,
        input:String,
        logsBloom:String,
        logs:[Logs],
        createdAt: String!,
        updatedAt: String!,
        block: Block,
        method: Method,
    }
    type RecordedTransaction{
        date: Int!,
        counts: Int,
    }
    type RecordAccountTransaction{
        toCount:Int,
        fromCount:Int,
        toTotal:Int,
        fromTotal:Int,
        month:String,
    }
    type Logs {
        logIndex: Int,
        transactionIndex: Int,
        transactionHash: String,
        blockHash: String,
        blockNumber: Int,
        address: String,
        data: String,
        topics: [String],
        type: String,
        id: String,
    }
    
    enum Sort{
        NONCE,
        BLOCK,
        FROM,
        TO,
        VALUE,
        STATUS,
        DATE,
    }

    type TransactionPaginator {
        transactions: [Transaction]
        paginator: Paginator!
    }
`;



module.exports = transactionTypeDefs;
