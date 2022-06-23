'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      await queryInterface.addColumn('Items', 'item_status', {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      }),
      await queryInterface.addColumn('Items', 'status_updatedAt', {
        type: Sequelize.DataTypes.DATE,
      })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
      await queryInterface.removeColumn('Items', 'item_status'),
      await queryInterface.removeColumn('Items', 'status_updatedAt')
  }
};
