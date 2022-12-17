const { StatusCodes } = require('http-status-codes')
const { APIError } = require('../errors/custom')

//Error handler. If none of the custom errors match return internal server error
const errorHandlerMiddleware = (err,req,res,next) => {
  console.log(err)
  if(err instanceof APIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'There was an error, please try again' })
}

module.exports = errorHandlerMiddleware

