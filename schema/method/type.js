const {gql} = require('apollo-server-express');


const methodTypeDefs = gql`
    
    type Method {
        id: ID!,
        hash:String,
        name:String,
        method:String,
    }
`;



module.exports = methodTypeDefs;
