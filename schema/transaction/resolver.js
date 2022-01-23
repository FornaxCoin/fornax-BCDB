const {Transaction, Block, Method} = require('../../models');
const {ApolloError} = require("apollo-server-express");
import Web3 from 'web3';
import {MAIN_NET_HTTP} from '../../config';
import lodash from 'lodash';
import axios from 'axios'


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
let fetchData = () => {
    return Transaction.find();
}
let SortBy = (sortBy) => {
    let SortBy;
    if (sortBy !== "" && sortBy !== undefined) {
        if (sortBy === 'NONCE') {
            SortBy = {nonce: -1}
        } else if (sortBy === 'BLOCK') {
            SortBy = {blockNumber: -1}
        } else if (sortBy === 'DATE') {
            SortBy = {createdAt: -1}
        } else if (sortBy === 'FROM') {
            SortBy = {from: -1}
        } else if (sortBy === 'TO') {
            SortBy = {to: -1}
        } else if (sortBy === 'VALUE') {
            SortBy = {value: -1}
        } else if (sortBy === 'STATUS') {
            SortBy = {status: -1}
        }
    } else {
        SortBy = 0;
    }
    return SortBy;
}

const resolvers = {
    Transaction: {
        block: async (parent) => {
            return await Block.findOne({"number": parent.blockNumber})
        },
        method: async (parent) => {
            let hash = parent.input.slice(0, 10);
            return await Method.findOne({"hash": hash})
        }
    },
    Query: {
        transactions: () => {
            return new ApolloError("Not Allowed", 405);
            return fetchData()
        },
        transactionsWithPagination: async (_, {page, limit, sortBy}, {Transaction}) => {
            const options = {
                page: page || 1,
                limit: limit || 10,
                customLabels: TransactionLabels,
                sort: SortBy(sortBy),
            };
            let transactions = await Transaction.paginate({}, options);
            return transactions
        },
        transactionById: async (_, args) => {
            let transaction = await Transaction.findById(args.id);
            return transaction;
        },
        transactionByTransactionHash: async (_, {transactionHash}) => {
            return await Transaction.findOne({transactionHash: transactionHash});
        },
        transactionsByAddress: async (_, {address, sortBy}) => {
            let finalAddress = address.toLowerCase()
            return new ApolloError("Not Allowed", 405);
            return await Transaction.find({'$or': [{from: finalAddress}, {to: finalAddress}]}).sort(SortBy(sortBy));
        },
        transactionsByAddressWithPagination: async (_, {page, limit, address, sortBy, network}) => {
            let finalAddress = address.toLowerCase();
            console.log("finalAddress:", finalAddress)
            if (network === 'ETH') {

                var config = {
                    method: 'get',
                    url: `https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${finalAddress}&startblock=0&endblock=999999999999&sort=desc&apikey=FE36DFQAXYCDPVHJB9IYNCHRCKQ78Y2DCS&page=${page}&offset=${limit}`,
                    headers: {}
                };

                let response = await axios(config);
                for (let i = 0; i < response.data.result.length; i++) {
                    response.data.result[i] = lodash.mapKeys(response.data.result[i], (value, key) => {
                        if (key === 'timeStamp') {
                            return 'timestamp'
                        } else if (key === 'hash') {
                            return 'transactionHash'
                        } else {
                            return key
                        }
                    })
                    // console.log('data:', data)
                }
                console.log(JSON.stringify(response.data));
                let transactionPaginator = {
                    paginator: {
                        slNo: 0,
                        prev: 0,
                        next: 0,
                        perPage: 0,
                        totalData: response.data.result.length,
                        totalPages: 1,
                        currentPage: 1,
                        hasPrevPage: false,
                        hasNextPage: false,
                    },
                }
                transactionPaginator.transactions = response.data.result;
                return transactionPaginator;

            } else if (network === 'BNB') {
                var config = {
                    method: 'get',
                    url: `https://api-testnet.bscscan.com/api?module=account&action=txlist&address=${finalAddress}&startblock=0&endblock=999999999999&sort=desc&apikey=JCPNESV6X3RG9M97UHMZYUX9X8HE7HCAQK&page=${page}&offset=${limit}`,
                    headers: {}
                };

                let response = await axios(config);
                for (let i = 0; i < response.data.result.length; i++) {
                    response.data.result[i] = lodash.mapKeys(response.data.result[i], (value, key) => {
                        if (key === 'timeStamp') {
                            return 'timestamp'
                        } else if (key === 'hash') {
                            return 'transactionHash'
                        } else {
                            return key
                        }
                    })
                    // console.log('data:', data)
                }
                console.log(JSON.stringify(response.data));
                let transactionPaginator = {
                    paginator: {
                        slNo: 0,
                        prev: 0,
                        next: 0,
                        perPage: 0,
                        totalData: response.data.result.length,
                        totalPages: 1,
                        currentPage: 1,
                        hasPrevPage: false,
                        hasNextPage: false,
                    },
                }
                transactionPaginator.transactions = response.data.result;
                return transactionPaginator;
            } else {
                const options = {
                    page: page || 1,
                    limit: limit || 10,
                    customLabels: TransactionLabels,
                    sort: SortBy(sortBy),
                };
                return await Transaction.paginate({'$or': [{to: finalAddress}, {contractAddress: finalAddress}, {from: finalAddress}]}, options);
            }

        },
        transactionsOf14Days: async () => {
            let date_ob = new Date();
            console.log(date_ob)
            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let year = date_ob.getFullYear();
            let unixTimestamp = Math.floor(new Date(`${year}-${month}-${date} 00:00:00.000`).getTime() / 1000);
            console.log(unixTimestamp);
            let data = [];
            let unixTimestampFrom = unixTimestamp - (14 * 86400);
            let transactions = await Transaction.find(
                {timestamp: {'$gte': unixTimestampFrom, '$lte': unixTimestamp}}, {timestamp: 1}
            );
            console.log("transactions:", transactions);

            for (let i = 14; i > 0; i--) {
                let unixTimestampFrom = unixTimestamp - (i * 86400);
                let unixTimestampTo = unixTimestampFrom + 86400;
                // console.log("unixTimestampFrom: " + unixTimestampFrom);
                // console.log("unixTimestampTo: " + unixTimestampTo);
                let filtered = lodash.filter(transactions, function (o) {
                    console.log("filtered: " + o.timestamp);
                    if (o.timestamp >= unixTimestampFrom && o.timestamp <= unixTimestampTo) {
                        console.log("find: " + o.timestamp);
                        return true
                    }
                });
                let recordedTransaction = {
                    date: unixTimestampFrom,
                    counts: filtered.length,
                }
                data.push(recordedTransaction);
                // console.log('recordedTransaction:',recordedTransaction)
            }
            console.log('data:', data);
            return data;

        },
        transactionsByMonth: async (_, {address, network}) => {
            let date_ob = new Date();
            console.log(date_ob)
            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let year = date_ob.getFullYear();
            let unixTimestamp = Math.floor(new Date().getTime() / 1000);
            let data = [];
            let currentYear = year;
            let currentMonth = month;
            if (parseInt(month) - 6 < 0) {
                currentYear = (parseInt(year) - 1).toString()
                currentMonth = (12 - (-(parseInt(month) - 6))).toString()
            } else {
                currentYear = year
                currentMonth = (parseInt(month) - 6).toString()
            }
            let unixTimestampFrom = Math.floor(new Date(`${currentYear}-${currentMonth}-01 00:00:00.000`).getTime() / 1000);
            console.log('To:', unixTimestamp);
            console.log('From:', unixTimestampFrom);
            let transactions = []
            address = address.toLowerCase()
            if (network === 'ETH') {

                var config = {
                    method: 'get',
                    url: `https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=999999999999&sort=asc&apikey=FE36DFQAXYCDPVHJB9IYNCHRCKQ78Y2DCS`,
                    headers: {}
                };

                let response = await axios(config);
                for (let i = 0; i < response.data.result.length; i++) {
                    response.data.result[i] = lodash.mapKeys(response.data.result[i], (value, key) => {
                        if (key === 'timeStamp') {
                            return 'timestamp'
                        } else if (key === 'hash') {
                            return 'transactionHash'
                        } else {
                            return key
                        }
                    })
                    // console.log('data:', data)
                }
                transactions = response.data.result;

            } else if (network === 'BNB') {
                var config = {
                    method: 'get',
                    url: `https://api-testnet.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=999999999999&sort=desc&apikey=JCPNESV6X3RG9M97UHMZYUX9X8HE7HCAQK`,
                    headers: {}
                };

                let response = await axios(config);
                for (let i = 0; i < response.data.result.length; i++) {
                    response.data.result[i] = lodash.mapKeys(response.data.result[i], (value, key) => {
                        if (key === 'timeStamp') {
                            return 'timestamp'
                        } else if (key === 'hash') {
                            return 'transactionHash'
                        } else {
                            return key
                        }
                    })
                    // console.log('data:', data)
                }
                transactions = response.data.result;

            } else {
                transactions = await Transaction.find({
                    '$and': [
                        {
                            '$or': [{from: address}, {to: address}]
                        },
                        {timestamp: {'$gte': unixTimestampFrom, '$lte': unixTimestamp}}
                    ]
                }, {timestamp: 1, value: 1, from: 1, to: 1});
            }
            console.log('transactions:', transactions);
            let nextMonth = currentMonth;
            let nextYear = currentYear;
            for (let i = 7; i > 0; i--) {
                if (parseInt(nextMonth) + 1 > 12) {
                    nextMonth = '01'
                    nextYear = (parseInt(nextYear) + 1).toString()
                } else {
                    nextMonth = (parseInt(nextMonth) + 1).toString()
                }
                unixTimestampFrom = Math.floor(new Date(`${currentYear}-${currentMonth}-01 00:00:00.000`).getTime() / 1000);
                let unixTimestampTo = Math.floor(new Date(`${nextYear}-${nextMonth}-01 00:00:00.000`).getTime() / 1000);
                currentYear = nextYear;
                currentMonth = nextMonth;
                console.log("unixTimestampFrom: " + new Date(unixTimestampFrom*1000));
                console.log("unixTimestampTo: " + new Date(unixTimestampTo*1000));


                let filteredMonthly = lodash.filter(transactions, function (o) {
                    return (lodash.gte(o.timestamp, unixTimestampFrom) && lodash.lte(o.timestamp, unixTimestampTo));
                });
                // console.log("filteredMonthly: " + filteredMonthly)
                let totalTo = 0, totalFrom = 0;
                let filteredTo = lodash.filter(filteredMonthly, function (o) {
                    if (o.to === address) {
                        totalTo += parseInt(o.value)
                        return true;
                    }
                });
                // console.log("filteredTo: " + filteredTo)

                let filteredFrom = lodash.filter(filteredMonthly, function (o) {
                    if (o.from === address) {
                        totalFrom += parseInt(o.value)
                        return true;
                    }
                });
                // console.log("filteredFrom: " + filteredFrom)

                let recordedTransaction = {
                    toCount: filteredTo.length,
                    toTotal: totalTo,
                    fromCount: filteredFrom.length,
                    fromTotal: totalFrom,
                    month: unixTimestampFrom,
                }
                data.push(recordedTransaction);
                // console.log('recordedTransaction:',recordedTransaction)
            }
            // console.log('data:', data);
            return data;

        },

    },

}

module.exports = resolvers;
