const User = require('../models/User')
const asyncWrapper = require('../middleware/asyncErrors')
const topics = require('../utils/tags')
const { NotFoundError, BadRequestError, APIError, UnauthenticatedError, ConflictError } = require('../errors/custom')
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcrypt')
//const mongoose = require('mongoose')

//get logged in user
const getUser = asyncWrapper(async (req, res) => {
    const user = await User.findById(req.user.id).select('email interests role')
    if (!user) {
    throw new NotFoundError('User not found')
    }
    res.status(StatusCodes.OK).json({ user })
})

//get users with email query
const getUsers = asyncWrapper(async (req, res) => {
    const { email } = req.query
    const queryObject = {}
    if (email) {
        queryObject.email = { $regex: email, $options: 'i' }
    }
    let result = User.find(queryObject)
        .select('email interests role')
    const users = await result
    res.status(StatusCodes.OK).json({ users })
})
//Create user with interest validation
const createUser = asyncWrapper(async (req, res) => {
    const { email, interests, password } = req.body
    const role = 'regular'
    const userExists = await User.findOne({ email })
    if (userExists) {
        throw new ConflictError("User with the same email already exists")
    }
    const found = interests.every(r => topics.includes(r))
    if (found == false) {
        throw new BadRequestError("Interests are invalid")
    }
    const user = new User({
        email,
        role,
        interests,
        password
    })
    const savedUser = await user.save(user)
    res.status(StatusCodes.CREATED).json({ savedUser })
})

//Get single user
const getSingleUser = asyncWrapper(async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
       .select('email interests role')
    if (!user) {
        throw new NotFoundError("No user with that id")
    }
    if (req.user.id != id && req.user.role != 'admin'){
        throw new UnauthenticatedError("Lacking permissions")
    }
    res.status(StatusCodes.OK).json({ user })
})

//Delete single user
const deleteUser = asyncWrapper(async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
        throw new NotFoundError("Didn't find user")
    }
    if (req.user.id != id && req.user.role != 'admin'){
        throw new UnauthenticatedError("Lacking permissions")
    }
    await User.findByIdAndRemove(id)
    return res.status(StatusCodes.OK).json({ success: true })
})
//Update user with interest validation
const updateUser = asyncWrapper(async (req, res) => {
    const { id } = req.params
    let { email, interests, role, password } = req.body
    if (req.user.id != id && req.user.role != 'admin'){
        throw new UnauthenticatedError("Lacking permissions")
    }
    if (interests != null) {
        const found = interests.every(r => topics.includes(r))
        if (found == false) {
            throw new BadRequestError("Interests are invalid")
        }
    }
    if (password != null) {
        const saltRounds = 10
        password = await bcrypt.hash(password, saltRounds)
    }
    const user = await User.findByIdAndUpdate(id, {
        email, interests, role, password
    }, {
        new: true,
        runValidators: true
    })
    if (!user) {
        throw new NotFoundError("Didn't find user")
    }
    res.status(StatusCodes.OK).json({ user })
})



module.exports = {
    getUser,
    getUsers,
    getSingleUser,
    deleteUser,
    updateUser,
    createUser
}