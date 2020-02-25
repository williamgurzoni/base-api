const Sequelize = require("sequelize");

// Database Connection
module.exports = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres"
  }
);
