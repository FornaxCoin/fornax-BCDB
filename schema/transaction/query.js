const {gql} = require('apollo-server-express');

// TODO sorting by index, blockNumber
// TODO search by transactionHash, address, block,

const transactionQuery = gql`
    extend type Query {
        transactions: [Transaction],
        transactionsWithPagination(page: Int, limit: Int, sortBy:Sort): TransactionPaginator!,
        transactionById(id:ID!): Transaction,
        transactionByTransactionHash(transactionHash:String!): Transaction,
        transactionsByAddress(address:String!, sortBy:Sort): [Transaction],
        transactionsByAddressWithPagination(page: Int, limit: Int, address:String!, sortBy:Sort, network:String): TransactionPaginator!,
        transactionsOf14Days: [RecordedTransaction],
        transactionsByMonth(address:String!, network:String): [RecordAccountTransaction],
    },

`;



module.exports = transactionQuery;
