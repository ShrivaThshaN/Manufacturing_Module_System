const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',     
  host: 'localhost',    
  database: 'MANM', 
  password: 'Now63750',     
  port: 5432,
});

module.exports = pool;
