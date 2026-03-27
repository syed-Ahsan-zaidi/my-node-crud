const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  // Railway par ye connectionString automatically DATABASE_URL uthayegi
  connectionString: process.env.DATABASE_URL, 
  ssl: {
    rejectUnauthorized: false // Production (Railway) par SSL zaroori hai
  }
});

// Initial connection test
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database Connection Error ❌:', err.message);
  } else {
    console.log('Database Connected Successfully ✅');
  }
});

module.exports = pool;