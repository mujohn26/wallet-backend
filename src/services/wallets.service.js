
import db from "../database/models";

class WalletsService{

  static async fetchWallets() {
    try {
      
      const wallets = await await db.Wallets.findAll()
      return wallets;
    } catch (error) {
      return error;
    }
  }

  static async fetchWalletsBlocks(walletAddress) {
    try {
      const wallets = await await db.Blocks.findAll({
        where:{account: walletAddress}
      })

      return wallets;
    } catch (error) {
      console.log('=-=-=-=-=-=-==', error)
      return error;
    }
  }
}


export default WalletsService;