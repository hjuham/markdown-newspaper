const express = require('express')
const router = express.Router()
const { authUser, authPerms } = require('../middleware/auth')
const { getUsers,
        createUser,
        getSingleUser,
        updateUser,
        deleteUser } = require( '../controllers/users')

router.route('/')
    .get([authUser, authPerms('admin')], getUsers) //Only for admin
    .post(createUser)
router.route('/:id')
    .get(authUser, getSingleUser) //Matching ID or admin role is checked in controllers
    .put(authUser, updateUser) //Matching ID or admin role is checked in controllers
    .delete(authUser, deleteUser) //Matching ID or admin role is checked in controllers

module.exports = router