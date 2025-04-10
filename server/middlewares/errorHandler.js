// server/middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Handle database errors
  if (err.code === '23505') { // Unique violation
    return res.status(400).json({
      message: 'Duplicate entry. This record already exists.'
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.errors
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Invalid token'
    });
  }

  // Handle other errors
  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export default errorHandler;
