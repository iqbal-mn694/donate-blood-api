const { checkSchema, validationResult } = require('express-validator');
const { validationErrors } = require('../libs/validationErrors');

exports.loginValidation = async (req) => {
  const result = await checkSchema({
    email: { 
      isEmail: {
        errorMessage: 'Email is not valid'
      },
      trim: true,
      toLowerCase: true,
    },
    password: {
      isEmpty: {
        negated: true,
        errorMessage: 'Password is required'
      }
    }
  }).run(req);

  // if(result.isEmpty()) next();
  return validationErrors(req);
    
}
