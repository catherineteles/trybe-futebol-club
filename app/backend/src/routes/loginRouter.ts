import { Router } from 'express';
import LoginController from '../controllers/loginController';

const router = Router();

router.post('/', LoginController.newLogin);
router.get('/validate', LoginController.validateLogin);

export default router;
