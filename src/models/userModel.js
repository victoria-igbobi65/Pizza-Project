const mongoose = require('mongoose')
var bcrypt = require('bcrypt')

const schema = mongoose.Schema;

const userSchema = new schema({
    firstName: {
        type: String,
        required: [true, 'Please provide first name!']
    },
    lastName: {
        type: String,
        required: [true, 'Pllease provide last name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide a valid email address'],
        unique: true

    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide your mobile number']
    },
    address: {
        type: String,
        required: [true, 'Address is a required field!']

    },
    userType: {
        type: String,
        enum: ["admin", "customer"],
        default: "customer"
    },
    password: {
        type: String,
        required: true,
        select: false,
        minLength: [8, 'Password must not be less than 8 characters!']
    }
},
{timestamps: true})

userSchema.pre('save', async function (next) {

    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined

    next()
})

const user = mongoose.model('users', userSchema)
module.exports = user
