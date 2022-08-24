import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchesModel';

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

  static listByProgress = async (bool: boolean): Promise<Match[]> => {
    const matches: Match[] = await Match.findAll(
      { where: { inProgress: bool },
        include:
        [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      },
    );

    return matches;
  };
}
