import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  static listMatches = async (req: Request, res: Response): Promise<void> => {
    const matches = await MatchesService.list();

    res.status(200).json(matches);
  };

  static listMatchesInProgress = async (req: Request, res: Response, next: NextFunction):
  Promise<void> => {
    const { inProgress } = req.query;
    if (typeof inProgress === 'string') {
      const isBoolean = inProgress === 'true';
      const matches = await MatchesService.listByProgress(isBoolean as boolean);
      res.status(200).json(matches);
    }
    next();
  };
}
