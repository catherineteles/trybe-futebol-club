export interface IMatches {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: string,
  awayTeamGoals: string,
  inProgress: boolean,
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  },
}
