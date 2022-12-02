const userModel = require('../models/userModel')
const AppError = require('../utils/appError')

exports.signUp = async (req, res, next) => {
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
    return res.status(200).json({status: "success", newUser})

}