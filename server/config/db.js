// server/config/db.js
import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config'; // Import dotenv using ES module syntax

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const connect = async () => {
  try {
    await pool.query('SELECT NOW()');
    return true;
  } catch (err) {
    throw err;
  }
};

const close = async () => {
  await pool.end();
};

const query = async (text, params) => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (err) {
    throw err;
  }
};

export { connect, close, query };
