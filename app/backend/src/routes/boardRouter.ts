import { Router } from 'express';
import BoardController from '../controllers/leaderboardController';

const router = Router();

router.get('/home', BoardController.listHomeTeams);

export default router;
