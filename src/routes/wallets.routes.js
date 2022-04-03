import express from 'express';
import WalletsController from '../controllers/wallets.controller';
const router = express.Router();

router.get('/', WalletsController.fetchWalletsData);

export default router;