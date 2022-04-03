import axios from 'axios';
import EtherscanService from '../services/etherscan.service';

var Client = require('coinbase').Client;
var client = new Client({
  'apiKey': 'YnSASPdT6efOCisj',
  'apiSecret': 'MVllniaIe83ZIwxkoYtdg3rnhrfMwyFp',
   "strictSSL": false
});
class CoinbaseController{

  static async getWalletsData(req, res) {

    client.getAccounts({}, function (err, accounts) {
      accounts.forEach(async(account) => {
        const data = {
          account: account.id,
          balance: account.native_balance.amount
        }

        const wallet = await EtherscanService.findOneWallet(account.id)
        if (wallet == account.id) {
          const updateResponse = await EtherscanService.updateWallet(data, wallet)

        } else {
          const response = await EtherscanService.createEtherscanData(data)

        }
        
      })
    });
    res.status(200).json({ message: "Wallets were added successfully" })

  }


}

export default CoinbaseController;