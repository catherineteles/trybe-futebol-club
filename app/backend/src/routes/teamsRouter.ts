import { Router } from 'express';
import TeamsController from '../controllers/teamController';

const router = Router();

router.get('/', TeamsController.listTeams);
router.get('/:id', TeamsController.findTeam);

export default router;
