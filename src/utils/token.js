const jwt = require('jsonwebtoken')
const welcomeMail = require('../utils/Emails/welcome')
require('dotenv').config()

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

exports.sendToken = async (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        httpOnly: true,
    }
    if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true
    }
    
    await welcomeMail({ name: user.firstName, email: user.email })
    res.cookie('jwt', token, cookieOptions );


    res.status(statusCode).json({
        status: "success",
        data: {
            user
        }
    })
}