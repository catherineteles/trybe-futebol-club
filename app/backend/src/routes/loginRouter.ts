import { Router } from 'express';
import LoginController from '../controllers/loginController';

const router = Router();

router.post('/', LoginController.newLogin);

export default router;
