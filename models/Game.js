const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Game extends Model {}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    words: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    compoundled: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correct_order: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hidden_word: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    upload_date: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "game",
  }
);

module.exports = Game;
