const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Paginate = require('mongoose-paginate-v2');

const methodSchema = new Schema({
    name:{
        type:String,
        default:""
    },
    hash: {
        type:String,
        default:""
    },
    method: {
        type:String,
        default:""
    },
}, {
    timestamps: true
});


// methodSchema.plugin(Paginate);
// const User = mongoose.model('users', userSchema);

const Method = mongoose.model('methods', methodSchema);
export default Method;

