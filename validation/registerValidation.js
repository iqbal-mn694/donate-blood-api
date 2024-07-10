const { checkSchema, validationResult } = require('express-validator');
const { validationErrors } = require('../libs/validationErrors');
const supabase  = require('../models/dbConnection');

exports.registerValidation = async (req) => {
  const result = await checkSchema({
    email: { 
      isEmail: {
        errorMessage: 'Email is not valid'
      },
      trim: true,
      toLowerCase: true,
      custom: {
        options: async (email) =>  {
          const { data: isEmailUsed } = await supabase.rpc('is_email_used', { user_email: email })

          if(isEmailUsed) throw { email: 'E-mail already in use' };
      }}
    },
    
    password: {
      isEmpty: {
        negated: true,
        errorMessage: 'Password is required'
      },
      isLength: {
        options: { min: 8 },
        errorMessage: 'Password minimum 8 characters'
      }
    }
  }).run(req);

  // if(result.isEmpty()) next();
  return validationErrors(req);
    
}
