const { json } = require('express');
const { validationResult } = require('express-validator');

exports.validateInput = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if(errors.isEmpty()) return next();

    const getErrorMessages = errors.array().map(err => ({ fields: err.path, message: err.msg }));
    next({ statusCode: 422, messages: getErrorMessages })
  }
}

