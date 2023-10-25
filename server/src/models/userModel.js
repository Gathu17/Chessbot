const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("./sequelize");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  username:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(password) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      this.setDataValue("password", hashedPassword);
    },
  },
});

module.exports = User;
console.log(User === sequelize.models.User); // true
