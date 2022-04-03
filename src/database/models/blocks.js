'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blocks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Blocks.belongsTo(models.Wallets)
      // define association here
    }
  }
  Blocks.init({
    account: DataTypes.STRING,
    blockNumber: DataTypes.STRING,
    timestamp: DataTypes.STRING,
    blockhash: DataTypes.STRING,
    WalletId: DataTypes.INTEGER,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    value: DataTypes.STRING,
    gas: DataTypes.STRING,
    gasPrice: DataTypes.STRING,
    gasUsed: DataTypes.STRING,
    hash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Blocks',
  });
  return Blocks;
};