const {Block, Transaction} = require('../../models');
const {ApolloError} = require("apollo-server-express");

let fetchData = () => {
    return Block.find();
}

const BlockLabels = {
    docs: 'blocks',
    limit: 'perPage',
    nextPage: 'next',
    prevPage: 'prev',
    meta: 'paginator',
    page: 'currentPage',
    pagingCounter: 'slNo',
    totalDocs: 'totalData',
    totalPages: 'totalPages',
};


let SortBy = (sortBy) => {
    let SortBy;
    console.log("sorting")
    if (sortBy !== "" && sortBy !== undefined) {
        console.log("not null")
        if (sortBy === 'NUMBER') {
            SortBy = {
                number: -1
            }
        } else if (sortBy === 'DATE') {
            console.log("date found")
            SortBy = {
                createdAt: -1
            }
        }
    } else {
        SortBy = 0;
    }
    return SortBy;
}

const resolvers = {
    Block:{
        transactions:async (parent)=>{
            return await Transaction.find({"_id":parent.transactions})
        },
    },
    Query: {
        blocks: () => {
            return new ApolloError("Not Allowed", 405);
            return fetchData()
        },
        blocksWithPagination: async (_,{page, limit, sortBy},{Block})=>{
            let sort = SortBy(sortBy)
            console.log(sort)
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: BlockLabels,
                sort: sort,
            };
            console.log('sortBy:',options)
            let blocks = await Block.paginate({}, options);
            return blocks
        },
        blockById: async (_, {id}) => {
            let block = await Block.findById(id);
            console.log("Block:", block);
            return block;
        },
        blockByNumber: async (_, {blockNumber}) => {
           try{
               let block = await Block.findOne({"number": blockNumber});
               console.log("Block:", block);
               return block;
           }catch(err){
               console.log(err);
           }
        },
        blockByHash: async (_, {blockHash}) => {
            try {
                const block = await Block.findOne({"hash": blockHash});
                console.log("Block:", block);
                return block;
            }catch(err){
                console.log(err);
            }
        },

    },

}

module.exports = resolvers;
