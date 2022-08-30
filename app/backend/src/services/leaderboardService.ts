import { IListMatch, IListTotal, IScoreMatch } from '../interfaces/IMatches';
import Match from '../database/models/MatchesModel';
import Team from '../database/models/TeamModel';

export default class BoardService {
  // Seleciona as partidas como homeMatches
  static listHome = async (): Promise<IListTotal[]> => {
    const teams: any[] = await Team.findAll(
      {
        include:
        [
          {
            model: Match,
            as: 'homeMatches',
            attributes: ['homeTeamGoals', 'awayTeamGoals'],
            where: { inProgress: false } },
        ],
        attributes: ['teamName'],
      },
    );
    const teamsNew = teams.map(({ teamName, homeMatches }) => {
      const data = BoardService.matchResult(homeMatches, 'home');
      return { name: teamName, ...data };
    });

    return teamsNew.map((team) => BoardService.createList(team));
  };

  // Define resultado da partida e total de goals

  static matchResult = (matches: IScoreMatch[], team: 'home' | 'away') => {
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;
    let goalsFavor = 0;
    let goalsOwn = 0;
    const rival = team === 'home' ? 'away' : 'home';

    matches.forEach((match) => {
      if (match[`${team}TeamGoals`] > match[`${rival}TeamGoals`]) {
        totalVictories += 1;
      } else if (match[`${team}TeamGoals`] < match[`${rival}TeamGoals`]) {
        totalLosses += 1;
      } else {
        totalDraws += 1;
      }
      goalsFavor += match[`${team}TeamGoals`];
      goalsOwn += match[`${rival}TeamGoals`];
    });

    return { totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn };
  };

  static createList = (teams: IListMatch) => {
    const { name, totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn } = teams;
    const totalPoints = totalVictories * 3 + totalDraws;
    const totalGames = totalVictories + totalLosses + totalDraws;
    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = (totalVictories / totalGames) * 100;
    return {
      name,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency: efficiency.toFixed(2),
    };
  };
}
