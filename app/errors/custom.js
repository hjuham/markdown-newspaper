const { StatusCodes } = require('http-status-codes');
//List https://www.npmjs.com/package/http-status-codes
class APIError extends Error {
    constructor(message) {
        super(message)
    }
}
class BadRequestError extends APIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}
class NotFoundError extends APIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}
class UnauthenticatedError extends APIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}
class ConflictError extends APIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.CONFLICT;
    }
}

module.exports = { APIError, BadRequestError, NotFoundError, UnauthenticatedError, ConflictError}
