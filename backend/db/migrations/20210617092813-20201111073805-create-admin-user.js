'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     const fields = await queryInterface.describeTable('admin_users'); // 放到这个表中
     const t = await queryInterface.sequelize.transaction();
 
     try {
       if (!fields.hasOwnProperty('status')) {
         await queryInterface.addColumn('admin_users', 'status', {
           type: Sequelize.INTEGER, // 字段数据类型
           allowNull: false, // 不允许为空
           defaultValue: 1,  // 默认,没有为0
           comment: '状态', // 字段描述
           after: 'role', // 字段放到这个字段之后
         }, { transaction: t });
       }
       await t.commit();
     } catch (err) {
       throw err;
     }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
