"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "playerOneId",
      });
    }
  }
  Room.init(
    {
      playerOneId: DataTypes.INTEGER,
      playerTwoId: DataTypes.INTEGER,
      macthInfo: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: ["", "", ""],
      },
      playerWin: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
