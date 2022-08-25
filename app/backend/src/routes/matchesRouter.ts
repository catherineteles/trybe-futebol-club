import { Router } from 'express';
import LoginController from '../controllers/loginController';
import MatchesController from '../controllers/matchesController';

const router = Router();

router.get('/', MatchesController.listMatchesInProgress);
router.get('/', MatchesController.listMatches);
router.use(LoginController.validateToken);
router.post('/', MatchesController.saveMatch);

export default router;
