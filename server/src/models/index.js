// "use strict";
const sequelize = require("../models/sequelize");

const User = require("./userModel");
const Game = require("./gameModel");
const Score = require("./scoreModel");
const PlayerGame = require("./playerGame");

User.belongsToMany(Game, { through: PlayerGame });
Game.belongsToMany(User, { through: PlayerGame });
Game.hasMany(PlayerGame);

module.exports = {
  User,
  Game,
  Score,
  PlayerGame,
  sequelize,
};
