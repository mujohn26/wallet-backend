import axios from 'axios';
import EtherscanService from '../services/etherscan.service';

class EtherscanWalletController{

  static async getWalletsData(req, res) {
    const addresses = [
      "0x6ec5ec42e79f57d42e80b6d8ba113903accda539",
      "0x76f4fe172a1215f5e6cad9f614c4633a5c430d09",
      "0x73e8d47767dd909ebc10f34ed186598b4ae4a71b",
      "0xcf6bfadd4bef5bef62ca9cd114cc72fe11d74d8d",
      "0xA8e43C4E98f2E39513c0286Ef45C4bF711778145",
      "0x36879D9a59B18711e5C4e970dC8b98F4894f7667",
      "0xFa4755640F537babaBE67e2220CD862b2D231591",
      "0x8220F9a1267C1C4378b2c3e0307B9B712398BEcF",
      "0xC2b1B510021fB1a5679F6F478b300b6ECaBC255c",
      "0xc7845Be7d80d0c213357350898E0870771C7C649",
      "0x51a72fC34781C6AFCC6da30Ad1204f618822C390"
    ]

    for (let index = 0; index < addresses.length; index++){
    const data = await axios.get(`https://api.etherscan.io/api?module=account&action=balancemulti&address=${addresses[index]}&tag=latest&apikey=H2CTXGJCY5KBHFUFY2E873MI7H2WYKKJWB`)
    console.log()
    const result = data.data.result;
  if (result != null && result.length!=0) {
  let count = 0;
  result.forEach(async(e) => {
   const data = {
    account: e.account,
    balance: e.balance
   }
    const walletData = await EtherscanService.findOneWallet(e.account)

    if (walletData.account == e.account) {
      const updateResponse = await EtherscanService.updateWallet(data, walletData.account)
      const blockData = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${e.account}&tag=latest&apikey=H2CTXGJCY5KBHFUFY2E873MI7H2WYKKJWB`)
      blockData.data.result.forEach(async (block) => {
        const blockData = {
          account: e.account,
          blockNumber: block.blockNumber,
          timestamp: block.timestamp,
          blockhash: block.blockHash,
          walletId: walletData.id,
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
          walletId: response.dataValues.id,
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
    
  
}}
res.status(200).json({ message: "Wallets were added successfully" })
  }
}

export default EtherscanWalletController;