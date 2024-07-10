const { validationResult } = require("express-validator");


exports.validationErrors = (req) => {
  const errors = validationResult(req);
  return errors.array().map(err => ({ fields: err.path, message: err.msg }))
}
