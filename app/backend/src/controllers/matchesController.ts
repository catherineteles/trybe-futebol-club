import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  static listMatches = async (req: Request, res: Response): Promise<void> => {
    const matches = await MatchesService.list();

    res.status(200).json(matches);
  };
}
