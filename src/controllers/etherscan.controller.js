import axios from 'axios';
import EtherscanService from '../services/etherscan.service';

class EtherscanWalletController{

  static async getWalletsData(req, res) {
    const address = "0x6ec5ec42e79f57d42e80b6d8ba113903accda539"
    const data = await axios.get(`https://api.etherscan.io/api?module=account&action=balancemulti&address=${address}&tag=latest&apikey=H2CTXGJCY5KBHFUFY2E873MI7H2WYKKJWB`)
    const result = data.data.result;

  if (result != null) {
  let count = 0;
  result.forEach(async(e) => {
   const data = {
    account: e.account,
    balance: e.balance
   }
    const wallet = await EtherscanService.findOneWallet(e.account)
    if (wallet == e.account) {
      const updateResponse = await EtherscanService.updateWallet(data, wallet)
      const blockData = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${e.account}&tag=latest&apikey=H2CTXGJCY5KBHFUFY2E873MI7H2WYKKJWB`)
      blockData.data.result.forEach(async (block) => {
        const blockData = {
          account: e.account,
          blockNumber: block.blockNumber,
          timestamp: block.timestamp,
          blockhash: block.blockHash,
          from: block.from,
          to: block.to,
          value: block.value,
          gas: block.gas,
          gasPrice: block.gasPrice,
          gasUsed: block.gasUsed,
          hash: block.hash
        }
        
        await EtherscanService.createBlock(blockData)
      })
    }
    else {
      const response = await EtherscanService.createEtherscanData(data)
      const blockData = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${e.account}&tag=latest&apikey=H2CTXGJCY5KBHFUFY2E873MI7H2WYKKJWB`)
      blockData.data.result.forEach(async (block) => {
        const blockData = {
          account: e.account,
          blockNumber: block.blockNumber,
          timestamp: block.timestamp,
          blockHash: block.blockHash,
          from: block.from,
          to: block.to,
          value: block.value,
          gas: block.gas,
          gasPrice: block.gasPrice,
          gasUsed: block.gasUsed,
          hash:block.hash
        }

        await EtherscanService.createBlock(blockData)
      })
    }
  });
    
    res.status(200).json({ message: "Wallets were added successfully" })
    
    }
  }
}

export default EtherscanWalletController;