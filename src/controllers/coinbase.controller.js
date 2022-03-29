import axios from 'axios';
import CryptoJs from 'crypto-js'
import crypto from 'crypto';

var Client = require('coinbase').Client;
var client = new Client({
  'apiKey': 'YnSASPdT6efOCisj',
  'apiSecret': 'MVllniaIe83ZIwxkoYtdg3rnhrfMwyFp',
   "strictSSL": false
});

let baseURL = "https://api.coinbase.com/v2"; 
let method = "GET"

var LOGIN_DATA = {
  apiKey:"YnSASPdT6efOCisj",
  apiSecret: "MVllniaIe83ZIwxkoYtdg3rnhrfMwyFp",
  version:"2018-01-05"
}
class CoinbaseController{

  constructor() {
    
  }
  
  static async getWalletsData(req, res) {

    client.getAccounts({}, function (err, accounts) {
      console.log('=-=-=-=-=-=',accounts);
    });
  }
 static Access_Sign(timestamp, method, requestPath, body, secret) {

  let prehash = timestamp + method.toUpperCase() + requestPath + body;
   return CryptoJs.HmacSHA256(prehash, secret).toString(CryptoJs.enc.Hex);
}
  static  async buildSignature(timestamp, method, requestPath, body) {
    let message = timestamp + method + requestPath 
    const hexDigest = crypto.createHmac('sha256', LOGIN_DATA.apiSecret).update(message).digest('hex');
    return hexDigest;
  }
  static async getServerTime() {
    let url = baseURL + "/time"
    
    let response = await axios.get(url)
    const timestamp = response.data.data.epoch;
    return timestamp;
  }

}

export default CoinbaseController;