'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  project.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        comment:'项目名称',
        validate: {
            notEmpty: true
        },
    },
    profile:DataTypes.STRING,
    token:DataTypes.STRING,
    status:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'project',
  });
  return project;
};