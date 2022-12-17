const mongoose = require('mongoose')
const topics = require('../utils/tags')
const bcrypt = require('bcrypt')
const roles = ['admin', 'regular']
//Schema that imports topics and uses predefined roles.
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'User must have an email'],
    },
    password: {
        type: String,
        required: [true, 'User must have a password']
    },
    role: {
        type: String,
        required: [true, 'User role must be provided'],
        enum: roles, default: 'regular'
    },
    interests: [{
        type: String,
        enum: topics,
        required: false
    }]

}, { timestamps: true })

//Salts password before user is saved. 
userSchema.pre('save', async function (next) {
    const user = this
    if (this.isModified('password') || this.isNew) {
        const saltRounds = 10
        user.password = await bcrypt.hash(user.password, saltRounds)
        next()
    }
})


module.exports = mongoose.model('User', userSchema)
