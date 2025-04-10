// server/server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import db from './config/db.js'; // Ensure this file is updated to use ES module syntax as well
import apiRoutes from './routes/api.js'; // Same for this route file
import errorHandler from './middlewares/errorHandler.js'; // Same for this file

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
db.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle shutdown
process.on('SIGINT', async () => {
  await db.close();
  process.exit(0);
});
