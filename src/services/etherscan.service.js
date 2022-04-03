import db from "../database/models";

class EtherscanService{

  static async createEtherscanData(data) {
    try {
      const response = await db.Wallets.create(data)
      return response;
    } catch (error) {
      return error;
    }
  }

  static async createBlock(data) {
    try {
      const response = await db.Blocks.create(data)
      return response
    }
    catch (error) {
      return error;
    }
  }

  static async findOneWallet(walletAddress) {
    const data = await db.Wallets.findOne({ where: { account: walletAddress } });
    if (data) {
      return data.dataValues
    }
    return 'false';
  }

  static async updateWallet(walletAddress, data) {
    const response = await db.Wallets.update(data, { where: { account: walletAddress } });
    if (response) {
      return response;
    }
    return 'false';

  }
}

export default EtherscanService;