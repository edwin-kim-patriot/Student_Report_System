// server/server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import db from './config/db.js';
import apiRoutes from './routes/api.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
db.connect()
  .then(() => console.log('✅ Connected to PostgreSQL database'))
  .catch((err) => {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// Error handler (should always come after routes)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await db.close();
  process.exit(0);
});
