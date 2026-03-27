const { Pool } = require('pg');
require('dotenv').config(); 

// Console log sirf check karne ke liye (Baad mein hata sakte hain)
console.log("DB User:", process.env.DB_USER);
console.log("DB Password:", process.env.DB_PASSWORD);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD), // Password ko string mein convert kiya
  port: process.env.DB_PORT,
});

pool.on('connect', () => {
  console.log('Postgres Database se connection kamyab raha!');
});

pool.on('error', (err) => {
  console.error('Database connection mein error aya:', err);
});

module.exports = pool;
 


