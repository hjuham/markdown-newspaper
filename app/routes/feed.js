const express = require('express')
const router = express.Router()
const { authUser } = require('../middleware/auth')
const { getFeed } = require('../controllers/articles')
//User feed route based on interests
router.route('/')
    .get(authUser, getFeed)

module.exports = router