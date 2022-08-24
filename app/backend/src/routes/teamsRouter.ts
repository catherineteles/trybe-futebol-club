import { Router } from 'express';
import TeamsController from '../controllers/teamController';

const router = Router();

router.get('/', TeamsController.listTeams);

export default router;
