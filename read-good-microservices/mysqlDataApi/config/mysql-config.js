/* eslint-disable global-require */
function startConnection() {
  require('../config');
  const mysql = require('mysql2/promise');
  if (process.env.NODE_ENV === 'development') {
    process.env.DB = 'test1';
  }
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB,
    multipleStatements: true,
  });
  return pool;
}

module.exports = { startConnection };
