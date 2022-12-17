const express = require('express')
const router = express.Router()
const passport = require('passport')

const { login,  logout } = require('../controllers/login')

// Login post route, pass in the login controller
router.route('/password').post(passport.authenticate('local'), login)
// Logout post route
router.route('/logout').post(logout)

module.exports = router
