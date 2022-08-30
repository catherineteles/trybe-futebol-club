export interface IScoreMatch {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IListMatch {
  name: string,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
}

export interface IListTotal extends IListMatch {
  totalPoints: number,
  totalGames: number,
  goalsBalance: number,
  efficiency: string,
}

export interface IUpdateMatch {
  id:number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IBodyMatch {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
}

export interface IMatches {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IMatchesWithNames extends IMatches {
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  },
}
