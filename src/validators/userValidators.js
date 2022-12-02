const joi = require('joi')

const validateUserMiddleWare = async (req, res, next) => {
    const userPayload = req.body
    try{
        await userValidator.validateAsync(userPayload)
        next()
    }
    catch(err){
        return res.status(406).json({
            err: err.details[0].message
        })
    }
}

const userValidator = joi.object({
    firstName: joi.string()
        .min(2)
        .max(255)
        .required(),
    lastName: joi.string()
        .min(2)
        .max(255)
        .required(),
    email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    phoneNumber: joi.string()
        .required(),
    address: joi.string()
        .min(10)
        .max(255)
        .required(),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
})

module.exports = validateUserMiddleWare;