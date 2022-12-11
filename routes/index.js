var express = require('express');

var auth = require('../src/routes/auth')
var rootRouter = express.Router();

rootRouter.use('/users', auth)

module.exports = rootRouter;
