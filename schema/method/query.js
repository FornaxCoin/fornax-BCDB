const {gql} = require('apollo-server-express');

const methodQuery = gql`
    extend type Query {
        methods: [Method],
        methodById(id:ID!): Method,
        methodByHash(hash:String!): Method,
    },
    
`;



module.exports = methodQuery;
