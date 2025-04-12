// server/middlewares/errorHandler.js

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error('🔥 Error:', err.stack || err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (err.code === '23505') {
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

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }

  return res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
