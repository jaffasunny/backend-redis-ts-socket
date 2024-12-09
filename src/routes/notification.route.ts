import { Router } from 'express';
import {
  getNotifications,
  viewNotifications,
} from '../controllers/notification.controller.ts';
import { authMiddleware, roleCheck } from '../middlewares/auth.middleware.ts';

const router = Router();

router.route('/').get(authMiddleware, roleCheck('author'), getNotifications);

router
  .route('/view')
  .get(authMiddleware, roleCheck('author'), viewNotifications);

export default router;
