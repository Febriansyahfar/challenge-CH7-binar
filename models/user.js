"use strict";
const { Model } = require("sequelize");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Room, {
        foreignKey: "playerOneId",
      });
    }
    static #encrypt = (password) => bcrypt.hashSync(password, 10);

    static register = ({ username, password, isAdmin }) => {
      const encryptedPassword = this.#encrypt(password);

      return this.create({ username, password: encryptedPassword, isAdmin });
    };

    checkPassword = (password) => bcrypt.compareSync(password, this.password);
    static authenticate = async ({ username, password }) => {
      try {
        const user = await this.findOne({ where: { username } });
        if (!user) {
          return Promise.reject("User not found");
        }
        const isPasswordValid = user.checkPassword(password);
        if (!isPasswordValid) {
          return Promise.reject("Wrong password");
        }
        return Promise.resolve(user);
      } catch (error) {
        return Promise.reject(err);
      }
    };

    // token based
    generateToken = () => {
      const payload = {
        id: this.id,
        username: this.username,
      };
      const verification_token = "asd";
      const token = jwt.sign(payload, verification_token);
      return token;
    };
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
