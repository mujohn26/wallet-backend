
import WalletsService from "../services/wallets.service";

class WalletsController{


  static async fetchWalletsData(req, res) {
    const walletData = await WalletsService.fetchWallets()
    let data = []
    for (const wallet of walletData) {
      const walletBlocks = await WalletsService.fetchWalletsBlocks(wallet.dataValues.account)
      let blocks = []
      for (const block of walletBlocks) {
        const singleBlock = block.dataValues
        const blockData = {
          blockNumber: singleBlock.blockNumber,
          timestamp: singleBlock.timestamp,
          blockHash: singleBlock.blockHash,
          walletId: singleBlock.WalletId,
          from: singleBlock.from,
          to: singleBlock.to,
          value: singleBlock.value,
          gas: singleBlock.gas,
          gasPrice: singleBlock.gasPrice,
          gasUsed: singleBlock.gasUsed,
          hash: singleBlock.hash
        }

        blocks.push(blockData)
      }
      const walletAndBlocks = {
        wallet:{
          account: wallet.dataValues.account,
          balance: wallet.dataValues.balance
        },
        blocks: blocks
      }
      data.push(walletAndBlocks)
    
    }
    res.status(200).json(
      {
        message: "Wallets were fetched successfully",
        data: data
      })
}
}

export default WalletsController;