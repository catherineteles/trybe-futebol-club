import { Request, Response } from 'express';
import TeamService from '../services/teamService';

export default class TeamsController {
  static listTeams = async (req: Request, res: Response): Promise<void> => {
    const teams = await TeamService.list();

    res.status(200).json(teams);
  };
}
