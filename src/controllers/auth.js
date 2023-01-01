const userModel = require('../models/userModel')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const Token = require('../utils/token')
// const welcomeMail = require('../utils/Emails/welcome')


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
    //await welcomeMail({ name: newUser.firstName, email: newUser.email })
    Token.sendToken(newUser, 200, res)

})

/*Login controller*/
exports.login = catchAsync( async( req, res, next ) => {
    const {email, password} = req.body
    if (!email || !password) return next(new AppError('Please provide email and password!', 400))

    /*Check user by email */
    const user = await userModel.findOne({ email })

    /* return error message if no user with the email address was found */
    if (!user || !( await user.correctPassword(password)) ) return next(new AppError('Incorrect email or password!', 400))
    Token.sendToken(user, 200, res)
})