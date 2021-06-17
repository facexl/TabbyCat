'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class admin_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static getPasswordHash(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
    authenticate(password){
        if(bcrypt.compareSync(password, this.password_digest)){
            return this
        }else{
            return false
        }
    }
  };
  admin_user.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        comment:'账号',
        validate: {
            notEmpty: true
        },
      },
      password_digest: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [6, 20]
        }
      },
      status:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  }, {
    sequelize,
    modelName: 'admin_user'
  });
  return admin_user;
};