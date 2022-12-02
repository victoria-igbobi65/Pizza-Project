var express = require('express');

var userRoute = require('../src/routes/userRoute')
var rootRouter = express.Router();

rootRouter.use('/users', userRoute)

module.exports = rootRouter;
