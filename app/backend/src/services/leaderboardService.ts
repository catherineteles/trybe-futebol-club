import { IScoreMatch } from '../interfaces/IMatches';
import Match from '../database/models/MatchesModel';
import Team from '../database/models/TeamModel';

export default class BoardService {
  // Seleciona as partidas como homeMatches
  static listHome = async (): Promise<Team[]> => {
    const teams: Team[] = await Team.findAll(
      {
        include:
        [
          {
            model: Match,
            as: 'homeMatches',
            attributes: ['homeTeamGoals', 'awayTeamGoals'],
            where: { inProgress: false } },
        ],
      },
    );

    return teams;
  };

  // Define resultado da partida

  static matchResult = (matches: IScoreMatch[], team: 'home' | 'away') => {
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;
    const rival = team === 'home' ? 'away' : 'home';

    matches.forEach((match) => {
      if (match[`${team}TeamGoals`] > match[`${rival}TeamGoals`]) {
        totalVictories += 1;
      } else if (match[`${team}TeamGoals`] < match[`${rival}TeamGoals`]) {
        totalLosses += 1;
      } else {
        totalDraws += 1;
      }
    });

    return { totalVictories, totalDraws, totalLosses };
  };
}
