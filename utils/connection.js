import mongoose from 'mongoose';
import {MONGO_URI} from '../config/index.js';


const getConnection = () => {
    // console.log('uri',MONGO_URI)
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    return db;
};

export default getConnection