const {gql} = require('apollo-server-express');


const blockTypeDefs = gql`    
    
    type Block {
        id: ID!,
        number:Int,
        hash:String,
        parentHash:String,
        mixHash:String,
        nonce:String,
        sha3Uncles:String,
        logsBloom:String,
        transactionsRoot:String,
        stateRoot:String,
        receiptsRoot:String,
        miner:String,
        difficulty:String,
        totalDifficulty:String,
        extraData:String,
        size:Int,
        gasLimit:Int,
        gasUsed:Int,
        timestamp:Int,
        transactions:[Transaction],
        uncles:[String],
        createdAt: String!,
        updatedAt: String!,
    }
    type Paginator {
        slNo: Int
        prev: Int
        next: Int
        perPage: Int
        totalData: Int
        totalPages: Int
        currentPage: Int
        hasPrevPage: Boolean
        hasNextPage: Boolean
    }

    type BlockPaginator {
        blocks: [Block]
        paginator: Paginator!
    }
    
    enum SortBy {
        NUMBER,
        DATE,
    }

`;



module.exports = blockTypeDefs;
