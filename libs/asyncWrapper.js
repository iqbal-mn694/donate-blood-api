const ErrorHandler = require("./errorHandler")

function asyncWrapper(fn) {
    return function(req, res, next) {
      fn(req, res, next).catch(err => next(new ErrorHandler(err, 422)))
    }
  }

module.exports = asyncWrapper