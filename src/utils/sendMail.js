const mailConfig = require('./nodemailerConfig')
const nodemailer = require('nodemailer')

const sendEmail = async({from, to, subject, html}) => {
    const transporter = nodemailer.createTransport(mailConfig)
    return transporter.sendMail({from, to, subject, html})
}

module.exports=sendEmail