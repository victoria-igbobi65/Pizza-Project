var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
require('dotenv').config()

var indexRouter = require('../routes/index');
var AppError = require('./utils/appError')
var globalErrorHandler = require('./controllers/error')
var db = require('./db')

db.connectToDatabase()
var app = express();

/* Rate limiting for application*/ 
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!' 
})
app.use(limiter)


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.enable('trust proxy')

if (process.env.NODE_ENV === 'development') { app.use(logger('dev')) }
/*body size limit*/
app.use(express.json({ limit : '10kb' }));
app.use(express.urlencoded({ extended: false , limit: '10kb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize())
app.use(helmet())



app.use('/', indexRouter);

app.use('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})
app.use(globalErrorHandler)


module.exports = app;
