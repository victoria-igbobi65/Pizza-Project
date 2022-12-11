var express = require('express')

var authController = require('../controllers/auth')
var userValidator = require('../validators/userValidators')

var userRouter = express.Router()

userRouter
    .route('/signup')
    .post(userValidator, authController.signUp)

module.exports = userRouter
