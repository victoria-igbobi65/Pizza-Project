var express = require('express')

var userController = require('../controllers/userController')
var userValidator = require('../validators/userValidators')

var userRouter = express.Router()

userRouter
    .route('/signup')
    .post(userValidator, userController.signUp)

module.exports = userRouter
