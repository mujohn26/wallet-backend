import express from 'express';
import etherScanWalletRoute from './etherscan_wallet.routes';
import coinbaseWalletRoute from './coinbase_wallet.routes'
import walletsRoute from './wallets.routes'

const Router = express.Router();

Router.use('/etherscan', etherScanWalletRoute);
Router.use('/coinbase', coinbaseWalletRoute);
Router.use('/wallets', walletsRoute);

export default Router;

