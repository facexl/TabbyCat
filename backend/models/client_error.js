'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class client_error extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  client_error.init({
    platform: DataTypes.STRING,
    operating:DataTypes.STRING,
    errString:DataTypes.STRING,
    environment:DataTypes.STRING,
    uid:DataTypes.STRING,
    url:DataTypes.STRING,
}, {
    sequelize,
    modelName: 'client_error',
  });
  return client_error;
};