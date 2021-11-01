const { mergeTypeDefs } = require('@graphql-tools/merge');

const baseTypeDefs =require('./baseDefs.js')
const blockQuery = require('./block/query.js')
const blockTypeDefs =require('./block/type')
const transactionTypeDefs =require('./transaction/type.js')
const transactionQuery = require('./transaction/query.js')
const methodTypeDefs = require('./method/type.js')
const methodQuery = require('./method/query.js')




const typeDefs = [
    baseTypeDefs,
    blockTypeDefs,
    blockQuery,
    transactionQuery,
    transactionTypeDefs,
    methodTypeDefs,
    methodQuery,
];

module.exports = mergeTypeDefs(typeDefs);
