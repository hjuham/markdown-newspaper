require('dotenv').config()
//See or create .env
const PORT = process.env.PORT
const SESSION_SECRET = process.env.SESSION_SECRET
let MONGODB_URI
if (process.env.NODE_ENV === 'test') { MONGODB_URI = process.env.MONGO_URI_TEST }
if (process.env.NODE_ENV === 'development') { MONGODB_URI = process.env.MONGO_URI_DEVELOPMENT }
if (process.env.NODE_ENV === 'production') { MONGODB_URI = process.env.MONGO_URI_PRODUCTION }
//User correct environment based on the script
const NODE_ENV = process.env.NODE_ENV
//Get admin user details
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
module.exports = {
    MONGODB_URI,
    PORT,
    NODE_ENV,
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
    SESSION_SECRET
}
