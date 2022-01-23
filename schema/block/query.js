const {gql} = require('apollo-server-express');

const blockQuery = gql`
    extend type Query {
        blocks: [Block],
        doubleBlocks: BlockCounterPaginator,
        blockById(id:ID!):Block,
        blockByNumber(blockNumber:Int!):Block,
        blocksByNumber(blockNumber:Int!):[Block],
        blockByHash(blockHash:String!):Block,
        blocksWithPagination(page: Int, limit: Int, sortBy: Sort):BlockPaginator!,
    },
    
    
`;



module.exports = blockQuery;
