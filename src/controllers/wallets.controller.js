
import WalletsService from "../services/wallets.service";

class WalletsController{


  static async fetchWalletsData(req, res) {
    const walletData = await WalletsService.fetchWallets()
    let data = []
    walletData.forEach(async (wallet) => {
      const walletBlocks = await WalletsService.fetchWalletsBlocks(wallet.account)
      let blocks = []
      await walletBlocks.forEach((block) => {
        const blockData = {
          blockNumber: block.blockNumber,
          timestamp: block.timestamp,
          blockHash: block.blockHash,
          walletId: block.WalletId,
          from: block.from,
          to: block.to,
          value: block.value,
          gas: block.gas,
          gasPrice: block.gasPrice,
          gasUsed: block.gasUsed,
          hash: block.hash
        }
        blocks.push(blockData)
      })
      const walletAndBlocks = {
        wallet:{
          account: wallet.account,
          balance: wallet.balance
        },
        blocks: blocks
      }
      data.push(walletAndBlocks)

    });
    console.log(data)
}
}

export default WalletsController;