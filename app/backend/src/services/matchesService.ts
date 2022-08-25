import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchesModel';
import { IMatches, IBodyMatch, IUpdateMatch } from '../interfaces/IMatches';

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

  static checkIfExist = async (id: number): Promise<boolean> => {
    const match: Match | null = await Match.findByPk(id);

    if (!match) {
      const error = new Error('There is no match with such id!');
      error.name = 'NotFoundError';
      throw error;
    }

    return true;
  };

  static updateMatch = async ({ id, awayTeamGoals, homeTeamGoals }: IUpdateMatch):
  Promise<number> => {
    const [updated] = await Match.update(
      {
        awayTeamGoals, homeTeamGoals,
      },
      {
        where: { id },
      },
    );
    return updated;
  };
}
