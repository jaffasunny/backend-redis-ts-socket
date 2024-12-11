import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { createOrAccessChat, getAllChats } from '../controllers/chat.controller';

const router = Router();

router.route('/').get(authMiddleware, getAllChats);
router.route('/').post(authMiddleware, createOrAccessChat);

export default router;
