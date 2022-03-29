import axios from 'axios';
import { response } from 'express';
import EtherscanService from '../services/etherscan.service';

class EtherscanWalletController{

  static async getWalletsData(req, res) {
    const data = await axios.get("https://api.etherscan.io/api?module=account&action=balancemulti&address=0x6ec5ec42e79f57d42e80b6d8ba113903accda539&tag=latest&apikey=H2CTXGJCY5KBHFUFY2E873MI7H2WYKKJWB")
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
    }
    else {
      const response = await EtherscanService.createEtherscanData(data)
    }
  });
    
    res.status(200).json({ message: "Wallets were added successfully" })
    
    }
  }
}

export default EtherscanWalletController;