const { mergeResolvers } = require('@graphql-tools/merge');
const blockResolver = require('./block/resolver.js');
const transactionResolver = require('./transaction/resolver.js');
const methodResolver = require('./method/resolver.js');

const resolvers = [
    blockResolver,
    transactionResolver,
    methodResolver,
];

module.exports = mergeResolvers(resolvers);
