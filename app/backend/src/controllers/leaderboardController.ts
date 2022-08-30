import { Request, Response } from 'express';
import { IListTotal } from '../interfaces/IMatches';
import sortByMultiple from '../middlewares/sort';
import BoardService from '../services/leaderboardService';

export default class BoardController {
  static listHomeTeams = async (req: Request, res: Response): Promise<void> => {
    const teams = await BoardService.listHome();
    const orderTeams: IListTotal[] = teams.sort(sortByMultiple);

    res.status(200).json(orderTeams);
  };
}
