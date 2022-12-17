const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')
const { StatusCodes } = require('http-status-codes')
const { APIError, UnauthenticatedError } = require('../errors/custom')
const User = require('../models/User')
//Use passport local strategy https://www.passportjs.org/packages/passport-local/
passport.use(new LocalStrategy(async function verify(email, password, cb) {
    try {
        const user = await User.findOne({ email })
        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(password, user.password)

        if (!(user && passwordCorrect)) {
            throw new UnauthenticatedError("Incorrect email or password")
        }
        return cb(null, user)
    } catch (err) {
        return cb(err)
    }
}))

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { role: user.role, id: user.id, email: user.email, interests: user.interests })
    })
})

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user)
    })
})

const login = (req, res) => {
    res.status(StatusCodes.OK).json({ "msg": "Succesfully logged in" , "success": true })
}

const logout = (req, res) => {
    req.logout((err) => {
        if (err) { throw new APIError('Something went wrong with logout', StatusCodes.INTERNAL_SERVER_ERROR) }
        res.status(StatusCodes.OK).json({ "msg": "Succesfully logged out" , "success": true })
    })
}

module.exports = { login, logout }