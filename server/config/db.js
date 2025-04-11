// server/config/db.js
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Optional but useful for checking DB connection at server start
const connect = async () => {
  await pool.query('SELECT NOW()');
  return true;
};

const close = async () => {
  await pool.end();
};

// Export both pool and helper methods
export default {
  connect,
  close,
  query: (text, params) => pool.query(text, params),
  pool // just in case you need raw access elsewhere
};

/*// server/config/db.js(not so clean)
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();


const pool = new Pool({
  user: 'edwin',
  host: 'localhost',
  database: 'student_reports',
  password: 'Mseto@2025',
  port: 5432,
});

export default pool;
*/
/*
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default pool;
*/

/*
or we can use this instead of code above(but need be rechecked first)
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
  await pool.query('SELECT NOW()');
  return true;
};

const close = async () => {
  await pool.end();
};

const query = async (text, params) => {
  const result = await pool.query(text, params);
  return result;
};

export { connect, close, query };
*/