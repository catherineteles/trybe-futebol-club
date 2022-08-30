import { IListTotal } from '../interfaces/IMatches';

const sortByMultiple = (a: IListTotal, b: IListTotal): number => {
  if (a.totalPoints !== b.totalPoints) {
    return b.totalPoints - a.totalPoints;
  }
  if (a.goalsBalance !== b.goalsBalance) {
    return b.goalsBalance - a.goalsBalance;
  }
  return b.goalsFavor - a.goalsFavor;
};

export default sortByMultiple;
