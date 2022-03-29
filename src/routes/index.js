import express from 'express';
import etherScanWalletRoute from './etherscan_wallet.routes';
import coinbaseWalletRoute from './coinbase_wallet.routes'

const Router = express.Router();

Router.use('/etherscan', etherScanWalletRoute);
Router.use('/coinbase',coinbaseWalletRoute)

export default Router;

