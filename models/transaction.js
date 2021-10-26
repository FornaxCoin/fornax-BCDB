const mongoose = require('mongoose');
const Paginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    transactionHash: {
        type:String,
        default:""
    },
    transactionIndex: {
        type:Number,
        default:null
    },
    blockHash: {
        type:String,
        default:""
    },
    blockNumber: {
        type:Number,
        default:null
    },
    from: {
        type:String,
        default:""
    },
    to:{
        type:String,
        default:""
    },
    value:{
        type:String,
        default:""
    },
    nonce:{
        type:Number,
        default:0,
    },
    gasPrice:{
        type:String,
        default:""
    },
    input:{
        type:String,
        default:""
    },
    gasUsed: {
        type:Number,
        default:null
    },
    cumulativeGasUsed: {
        type:Number,
        default:null
    },
    contractAddress: {
        type:String,
        default:""
    },
    status: {
        type:Boolean,
        default:false
    },
    logsBloom: {
        type:String,
        default:""
    },
    logs: [{
        logIndex:{
          type:Number,
            default:null
        },
        transactionIndex:{
            type:Number,
            default:null
        },
        transactionHash:{
            type:String,
            default:""
        },
        blockHash:{
            type:String,
            default:""
        },
        blockNumber:{
            type:Number,
            default:null
        },
        address:{
            type:String,
            default:"",
        },
        data:{
            type:String,
            default:""
        },
        topics:[],
        type:{
            type:String,
            default:""
        },
        id:{
            type:String,
            default:""
        }
    }]
}, {
    timestamps: true
});

transactionSchema.plugin(Paginate);

// const User = mongoose.model('users', userSchema);

const Transaction = mongoose.model('transactions', transactionSchema);
export default Transaction;

