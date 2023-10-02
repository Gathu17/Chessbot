const { Sequelize } = require('sequelize');
const connection = require("../config/dbConnection.json");

const sequelize = new Sequelize({
  database: connection.database,
  username: connection.username,
  host: connection.host,
  port: connection.port,
  password: connection.password,
  dialect: connection.dialect,
});

module.exports = sequelize;