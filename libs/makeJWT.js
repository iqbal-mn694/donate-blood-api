const jwt = require('jsonwebtoken');

exports.generateJWT = (payload, secretKey, expiresIn) => {
  return jwt.sign(payload, secretKey, { expiresIn: expiresIn});
}

exports.verifyJWT = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        reject({ messages: 'User not authenticated or not valid access token', statusCode: 401 });
      } else {
        resolve(decoded);
      }
    });
  });
}

