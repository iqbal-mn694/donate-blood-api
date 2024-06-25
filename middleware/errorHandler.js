const { validationResult } = require("express-validator");

const errorHandler = (err, req, res, next) => {
  let message = err.message || "Internal Server Error";
  let statusCode = err.statusCode || 500;

  if(err.code === 'XX000' || err.code === '22P02') {
    statusCode = 422;
    message = 'Your input is not valid';
  }

  const err1 = validationResult(req)
  console.log(err1)
  res.status(statusCode).json({ error: true, message});
}

module.exports = errorHandler;