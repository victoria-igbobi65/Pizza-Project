const userModel = require('../models/userModel')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const Token = require('../utils/token')
const welcomeMail = require('../utils/Emails/welcome')

exports.signUp = catchAsync( async (req, res, next) => {
    const { firstName, lastName, email, phoneNumber, address, password } = req.body;

    const user = await userModel.findOne({email: email})
    if (user){
        return next(new AppError('This user already exists, please log in!', 400))
    }

    /* Handling creating new user*/
    const newUser = await userModel.create({
        firstName, lastName, email, phoneNumber, address, password
    });

    /*returning new user*/
    newUser.password = undefined

    /*send email*/
    await welcomeMail({name: newUser.firstName, email: newUser.email})
    Token.sendToken(newUser, 200, res)

})