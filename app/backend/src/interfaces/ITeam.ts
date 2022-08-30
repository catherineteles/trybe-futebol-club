import Team from '../database/models/TeamModel';
import { IScoreMatch } from './IMatches';

export interface ITeam {
  id: number,
  teamName: string,
}

export interface ITeamWithMatches extends Team {
  homeMatches: IScoreMatch[],
}
