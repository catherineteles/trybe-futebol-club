import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const router = Router();

router.get('/', MatchesController.listMatchesInProgress);
router.get('/', MatchesController.listMatches);

export default router;
