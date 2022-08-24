import Team from '../database/models/TeamModel';

export default class TeamService {
  static list = async (): Promise<Team[]> => {
    const teams: Team[] = await Team.findAll();

    return teams;
  };
}
