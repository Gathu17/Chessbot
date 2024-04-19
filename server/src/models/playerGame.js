const { DataTypes } = require("sequelize");
const sequelize = require("../models/sequelize");

const PlayerGame = sequelize.define("playerGame", {
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    user_id: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    }
  });
  

module.exports = PlayerGame;