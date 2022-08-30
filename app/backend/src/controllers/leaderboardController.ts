import { Request, Response } from 'express';
import BoardService from '../services/leaderboardService';

export default class BoardController {
  static listHomeTeams = async (req: Request, res: Response): Promise<void> => {
    const teams = await BoardService.listHome();

    res.status(200).json(teams);
  };
}
