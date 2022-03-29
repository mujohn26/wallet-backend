import express from 'express';
import etherScanWalletRoute from './etherscan_wallet.routes';

const Router = express.Router();

Router.use('/etherscan', etherScanWalletRoute);

export default Router;

