const { StatusCodes } = require("http-status-codes");
const { APIError } = require("../errors/custom");

//Error handler. If none of the custom errors match return internal server error
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  if (err instanceof APIError) {
    // Only show detailed message in development
    const msg =
      process.env.NODE_ENV === "production" ? "Request failed" : err.message;
    return res.status(err.statusCode).json({ msg });
  }
  if (err.name === "ValidationError") {
    const msg =
      process.env.NODE_ENV === "production" ? "Invalid data" : err.message;
    return res.status(400).json({ msg });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ msg: "Invalid resource identifier" });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "There was an error, please try again" });
};
module.exports = errorHandlerMiddleware;
