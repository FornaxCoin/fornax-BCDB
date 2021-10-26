const { mergeResolvers } = require('@graphql-tools/merge');
const blockResolver = require('./block/resolver.js');
const transactionResolver = require('./transaction/resolver.js');

const resolvers = [
    blockResolver,
    transactionResolver,
];

module.exports = mergeResolvers(resolvers);
