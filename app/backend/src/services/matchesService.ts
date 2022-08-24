import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchesModel';
import { IMatches, IBodyMatch } from '../interfaces/IMatches';

export default class MatchesService {
  static list = async (): Promise<Match[]> => {
    const matches: Match[] = await Match.findAll(
      { include:
        [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      },
    );

    return matches;
  };

  static listByProgress = async (inProgress: boolean): Promise<Match[]> => {
    const matches: Match[] = await Match.findAll(
      {
        include:
        [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
        where: { inProgress },
      },
    );

    return matches;
  };

  static create = async ({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals }: IBodyMatch):
  Promise<IMatches> => {
    const match: Match = await Match
      .create({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress: true });

    return match;
  };
}
