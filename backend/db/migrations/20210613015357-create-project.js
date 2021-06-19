'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      profile: {
        type: Sequelize.STRING
      },
      token:{
        type: Sequelize.STRING
      },
      status:{
        type: Sequelize.INTEGER, // 字段数据类型
        allowNull: false, // 不允许为空
        defaultValue: 1,  // 默认,没有为0
        comment: '状态', // 字段描述
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
    await queryInterface.dropTable('projects');
  }
};