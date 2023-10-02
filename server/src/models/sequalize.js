"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../config/dbConnection.json");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize({
  database: connection.database,
  username: connection.username,
  host: connection.host,
  port: connection.port,
  password: connection.password,
  dialect: connection.dialect,
  operatorsAliases: false,
});

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure uniqueness
    validate: {
      isEmail: true, // Ensure it's a valid email format
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(password) {
      // Hash the password before saving it to the database
      const hashedPassword = bcrypt.hashSync(password, 10); // Use bcrypt for hashing (adjust the saltRounds as needed)
      this.setDataValue("password", hashedPassword);
    },
  },
});

const Game = sequelize.define("Game", {
  status: {
    type: DataTypes.ENUM("pending", "in-progress", "complete"),
  },
});

// Define the Scores model
const Score = sequelize.define("Score", {
  game_outcome: Sequelize.ENUM("0", "1", "2"),
});

const PlayerGame = sequelize.define("PlayerGame", {
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

User.belongsToMany(Game, { through: PlayerGame });
Game.belongsToMany(User, { through: PlayerGame });
Game.hasMany(PlayerGame);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable("Users", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      });

      await queryInterface.createTable("Games", {
        // Define columns for the Games table here
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        status: Sequelize.ENUM("pending", "in-progress", "complete"),
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      });

      await queryInterface.createTable("Scores", {
        // Define columns for the Scores table here
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        game_outcome: Sequelize.ENUM("0", "1", "2"),
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      });

      await queryInterface.createTable("PlayerGames", {
        // Define columns for the PlayerGames table here
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        score: Sequelize.INTEGER,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      });

      console.log("Tables created successfully.");
    } catch (error) {
      console.error("Error creating tables:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    // Add your migration rollback logic here to drop tables
    try {
      await queryInterface.dropTable("PlayerGames");
      await queryInterface.dropTable("Scores");
      await queryInterface.dropTable("Games");
      await queryInterface.dropTable("Users");

      console.log("Tables dropped successfully.");
    } catch (error) {
      console.error("Error dropping tables:", error);
    }
  },
};
