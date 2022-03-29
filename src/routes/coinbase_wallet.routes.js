import express from 'express';
import CoinbaseController from '../controllers/coinbase.controller';

const router = express.Router();

router.post('/', CoinbaseController.getWalletsData);

export default router;

