const errorHandler = (err, req, res, next) => {
  let message = err.message || "Internal Server Error";
  let statusCode = err.statusCode || 500;

  if(err.code === 'XX000' || err.code === '22P02') {
    statusCode = 422;
    message = 'Your input is not valid';
  }

  console.log(err)
  res.status(statusCode).json({ error: true, message});
}

module.exports = errorHandler;