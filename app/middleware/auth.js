const { APIError, UnauthenticatedError } = require('../errors/custom')
const { StatusCodes } = require('http-status-codes')
const asyncWrapper = require('../middleware/asyncErrors')

//Check if request has a user object
const authUser = asyncWrapper(async (req,res,next) => {
  if(!req.user) {
    throw new UnauthenticatedError("Not authenticated")
  }
  next()
})

//Check if user object has the correct role
const authPerms = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthenticatedError("Lacking permissions")
    }
    next()
  }
}

module.exports = { authUser, authPerms }