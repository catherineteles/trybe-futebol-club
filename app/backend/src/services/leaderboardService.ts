import Match from '../database/models/MatchesModel';
import Team from '../database/models/TeamModel';

export default class BoardService {
  static listHome = async (): Promise<Team[]> => {
    const teams: Team[] = await Team.findAll(
      {
        include:
        [
          { model: Match, as: 'homeMatches', attributes: { exclude: ['id'] } },
        ],
        where: { inProgress: false },
      },
    );

    return teams;
  };
}
