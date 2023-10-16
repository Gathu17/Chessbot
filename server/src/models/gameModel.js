const { DataTypes } = require("sequelize");
const sequelize = require("../models/sequelize");

const Game = sequelize.define("Game", {
  status: {
    type: DataTypes.ENUM("pending", "in-progress", "complete"),
  },
});

module.exports = Game;
