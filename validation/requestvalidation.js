const { checkSchema, validationResult } = require('express-validator');
const { validationErrors } = require('../libs/validationErrors');
const supabase  = require('../models/dbConnection');

exports.requestValidation = async (req) => {
  const result = await checkSchema({
    bloodType: {
      isEmpty: {
        negated: true,
        errorMessage: 'Blood type is required'
      },
      isIn: {
        options: ['A', 'a', 'B', 'b', 'AB', 'ab', 'O', 'o'],
        errorMessage: 'Blood type is not valid'
      }
    },
    
    hospitalName: {
      isEmpty: {
        negated: true,
        errorMessage: 'Hospital name is required'
      }
    },
    
    latitude: {
      isEmpty: {
        negated: true,
        errorMessage: 'Latitude is required'
      },

      isLatLong: {
        errorMessage: 'Latitude is not valid'
      }
    },

    longitude: {
      isEmpty: {
        negated: true,
        errorMessage: 'Longitude is required'
      },

      isLatLong: {
        errorMessage: 'Longitude is not valid'
      }
    }
  }).run(req);

  // if(result.isEmpty()) next();
  return validationErrors(req);
    
}
