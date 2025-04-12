// server/middlewares/errorHandler.js
const errorHandler = (err, req, res) => {
  console.error('🔥 Error:', err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Handle specific error codes or custom error types
  if (err.code === '23505') { // For duplicate entry error
    return res.status(400).json({
      message: 'Duplicate entry. This record already exists.',
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.errors,
    });
  }

  if (err.name === 'JsonWebTokenError') { // JWT-related errors
    return res.status(401).json({
      message: 'Invalid token',
    });
  }

  // Fallback for any other errors
  return res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
