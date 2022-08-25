import Team from '../database/models/TeamModel';

export default class TeamService {
  static list = async (): Promise<Team[]> => {
    const teams: Team[] = await Team.findAll();

    return teams;
  };

  static findById = async (id:number): Promise<Team> => {
    const team: Team | null = await Team.findByPk(id);
    if (!team) {
      const err = new Error('Team not found');
      err.name = 'NotFoundError';
      throw err;
    }
    return team;
  };

  static checkIfExist = async (id: number): Promise<boolean> => {
    const team: Team | null = await Team.findByPk(id);

    if (!team) {
      const error = new Error('There is no team with such id!');
      error.name = 'NotFoundError';
      throw error;
    }

    return true;
  };
}
