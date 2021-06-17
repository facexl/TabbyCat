'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('admin_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
        comment:'账号'
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status:{
        type: Sequelize.INTEGER, // 字段数据类型
        allowNull: false, // 不允许为空
        defaultValue: 1,  // 默认,没有为0
        comment: '状态', // 字段描述
      },
      password_digest:{
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('admin_users');
  }
};