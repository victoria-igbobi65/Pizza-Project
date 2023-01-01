var express = require('express')

var authController = require('../controllers/auth')
var userValidator = require('../validators/userValidators')

var userRouter = express.Router()

userRouter
    .route('/signup')
    .post(userValidator, authController.signUp)

userRouter
    .route('/login')
    .post(authController.login)

module.exports = userRouter
