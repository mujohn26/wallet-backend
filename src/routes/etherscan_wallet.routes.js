import exp from 'constants';
import express from 'express';
import EtherscanWalletController from '../controllers/etherscan.controller';

const router = express.Router();

router.post('/', EtherscanWalletController.getWalletsData);

export default router;