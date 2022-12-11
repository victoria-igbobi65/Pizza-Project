require('dotenv').config()

module.exports = {
    mongoUrl: process.env.DB_URL,
    port: process.env.PORT,
    jwtSecret: process.env.JWTSECRET,
    email_username: process.env.EMAIL_USERNAME,
    email_password: process.env.EMAIL_PASSWORD,
    email_host: process.env.EMAIL_HOST,
    email_port: process.env.EMAIL_PORT,
    email_from: process.env.EMAIL_FROM,
    node_env: process.env.NODE_ENV
}

