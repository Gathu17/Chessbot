const { DataTypes } = require("sequelize");

const sequelize = require("../models/sequelize");

// Define the Scores model
const Score = sequelize.define("Score", {
  game_outcome: DataTypes.ENUM("0", "1", "2"),
});

module.exports = Score;
