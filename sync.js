var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const mongoose = require('mongoose');
import * as AppModels from './models';
import {syncBlockChain} from "./helpers/sync";
import bodyParser from 'body-parser';

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let cors=require('cors');

// connect to DB mongo
const uri = "mongodb+srv://qasim:qasim1234@abdulla.eftvp.mongodb.net/bcdbTest?retryWrites=true&w=majority";
mongoose.connect(uri);
mongoose.Promise = global.Promise;
mongoose.connection.once('open', () => {
    console.log(' 🍃 connected to mongoDB mLab');
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));
//
// app.listen(4001, () => {
//     console.log('🚀 now listening for requests on port 4001');
// });

(async()=>{
    console.log("hello")
    await syncBlockChain();
})()

module.exports = app;
