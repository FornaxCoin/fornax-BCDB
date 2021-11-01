const {Method} = require('../../models');
const {ApolloError} = require("apollo-server-express");

let fetchData = ()=>{
    return Method.find();
}
const resolvers = {
    Method: {
      // block: async (parent) =>{
      //     return await Method.findOne({"number":parent.blockNumber})
      // }
    },
    Query: {
        methods: () => {
            return fetchData()
        },
        methodById: async (_,args)=>{
            return await Method.findById(args.id);
        },
        methodByHash:async(_,{hash})=>{
            return await Method.findOne({hash:hash});
        },
    },
   
}

module.exports = resolvers;
