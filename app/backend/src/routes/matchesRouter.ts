import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const router = Router();

router.get('/', MatchesController.listMatchesInProgress);
router.get('/', MatchesController.listMatches);
router.post('/', MatchesController.saveMatch);

export default router;
