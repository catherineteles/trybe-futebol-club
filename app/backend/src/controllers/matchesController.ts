import { NextFunction, Request, Response } from 'express';
import { validateMatch } from '../services/validateLogin';
import MatchesService from '../services/matchesService';
import JwtService from '../services/JWTservice';

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

  static saveMatch = async (req: Request, res: Response): Promise<void> => {
    await validateMatch(req.body);
    const { authorization } = req.headers;
    await JwtService.validateToken(authorization as string);
    const match = await MatchesService.create(req.body);

    res.status(201).json(match);
  };

  static endMatch = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await MatchesService.checkIfExist(id as unknown as number);
    await MatchesService.finishMatch(id as unknown as number);

    res.status(200).json({ message: 'Finished' });
  };

  static updateMatch = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { awayTeamGoals, homeTeamGoals } = req.body;
    await MatchesService.checkIfExist(id as unknown as number);
    await MatchesService.updateMatch({ id: +id, awayTeamGoals, homeTeamGoals });

    res.status(200).json({ message: 'Updated' });
  };
}
