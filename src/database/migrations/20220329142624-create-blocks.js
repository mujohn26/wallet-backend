'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Blocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique:true,
        type: Sequelize.INTEGER
      },
      account: {
        type: Sequelize.STRING,
        references: {
          model: 'Wallets', // name of Target model
          key: 'account', // key in Target model that we're referencing
        },
        onDelete: "CASCADE",
        onUpdate:'CASCADE'
      },
      WalletId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Wallets', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: "CASCADE",
        onUpdate: 'CASCADE'
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