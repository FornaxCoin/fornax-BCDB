const {Transaction, Block, Method} = require('../../models');
const {ApolloError} = require("apollo-server-express");
import Web3 from 'web3';
import {MAIN_NET_HTTP} from '../../config'
const web3 = new Web3(MAIN_NET_HTTP);

const TransactionLabels = {
    docs: 'transactions',
    limit: 'perPage',
    nextPage: 'next',
    prevPage: 'prev',
    meta: 'paginator',
    page: 'currentPage',
    pagingCounter: 'slNo',
    totalDocs: 'totalData',
    totalPages: 'totalPages',
};
let fetchData = ()=>{
    return Transaction.find();
}
let SortBy = (sortBy)=>{
    let SortBy;
    if(sortBy!==""&&sortBy!==undefined){
        if(sortBy==='NONCE'){
            SortBy={nonce: -1}
        }else if(sortBy==='BLOCK'){
            SortBy={blockNumber: -1}
        }else if(sortBy==='DATE'){
            SortBy={createdAt: -1}
        }else if(sortBy==='FROM'){
            SortBy={from: -1}
        }else if(sortBy==='TO'){
            SortBy={to: -1}
        }else if(sortBy==='VALUE'){
            SortBy={value: -1}
        }else if(sortBy==='STATUS'){
            SortBy={status: -1}
        }
    }else {
        SortBy = 0;
    }
    return SortBy;
}

const resolvers = {
    Transaction: {
      block: async (parent) =>{
          return await Block.findOne({"number":parent.blockNumber})
      },
      method: async (parent) => {
          let hash = parent.input.slice(0, 10);
          return await Method.findOne({"hash":hash})
      }
    },
    Query: {
        transactions: () => {
            return new ApolloError("Not Allowed", 405);
            return fetchData()
        },
        transactionsWithPagination: async (_,{page, limit, sortBy},{Transaction})=>{
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: TransactionLabels,
                sort: SortBy(sortBy),
            };
            let transactions = await Transaction.paginate({}, options);
            return transactions
        },
        transactionById: async (_,args)=>{
            let transaction= await Transaction.findById(args.id);
            console.log(web3.utils.toAscii(transaction.input))
            console.log("Transaction:",transaction);
            return transaction;
        },
        transactionByTransactionHash:async(_,{transactionHash})=>{
            return await Transaction.findOne({transactionHash:transactionHash});
        },
        transactionsByAddress:async (_,{address,sortBy})=>{
            return new ApolloError("Not Allowed", 405);
            return await Transaction.find({'$or':[{from:address},{to:address}]}).sort(SortBy(sortBy));
        },
        transactionsByAddressWithPagination:async (_,{page, limit, address,sortBy})=>{
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: TransactionLabels,
                sort: SortBy(sortBy),
            };
           return await Transaction.paginate({'$or':[{from:address},{to:address}, {contractAddress:address}]}, options);

        },

    },
   
}

module.exports = resolvers;
