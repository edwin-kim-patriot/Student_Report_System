// server/config/db.js
const { Pool } = require('pg');
require('dotenv').config();

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

module.exports = {
  connect,
  close,
  query
};