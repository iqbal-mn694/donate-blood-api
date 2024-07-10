const errorHandler = (err, req, res, next) => {
  let messages = err.messages || err.message || "Internal Server Error";
  let statusCode = err.statusCode || err.status || 500;
  	
  if(err.code === 'XX000' || err.code === '22P02') {
    statusCode = 422;
    message = 'Your input is not valid';
  }

  res.status(statusCode).json({ success: false, status: statusCode, messages, data: [] });
}

module.exports = errorHandler;

// class ErrorHandler extends Error {
//   constructor(status, message) {
//     super(message);
//     this.status = status;
//   }
// }

// module.exports = ErrorHandler;

