const errorHandler = (err, req, res, next) => {
  let messages = err.messages || "Internal Server Error";
  let statusCode = err.statusCode || 500;

  if(err.code === 'XX000' || err.code === '22P02') {
    statusCode = 422;
    message = 'Your input is not valid';
  }

  res.status(statusCode).json({ error: true, messages });
}

module.exports = errorHandler;