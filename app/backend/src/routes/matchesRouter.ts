import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const router = Router();

router.get('/', MatchesController.listMatches);

export default router;
