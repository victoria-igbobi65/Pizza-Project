const jwt = require('jsonwebtoken')
require('dotenv').config()

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

exports.sendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        httpOnly: true,
    }
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions );


    res.status(statusCode).json({
        status: "success",
        data: {
            user
        }
    })
}