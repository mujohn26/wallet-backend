'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Blocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      account: {
        type: Sequelize.STRING
      },
      blockNumber: {
        type: Sequelize.STRING
      },
      timestamp: {
        type: Sequelize.STRING
      },
      blockhash: {
        type: Sequelize.STRING
      },
      from: {
        type: Sequelize.STRING
      },
      to: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
      },
      gas: {
        type: Sequelize.STRING
      },
      gasPrice: {
        type: Sequelize.STRING
      },
      gasUsed: {
        type: Sequelize.STRING
      },
      hash: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Blocks');
  }
};