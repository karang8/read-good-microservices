require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
};
