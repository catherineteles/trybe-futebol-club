import { IUser, IUserWithPassword } from '../interfaces/ILogin';
import User from '../database/models/UserModel';
import JwtService from './JWTservice';
import passwordService from './passwordService';

export default class LoginService {
  static login = async (email:string, password:string): Promise<string> => {
    const user: IUserWithPassword | null = await User.findOne({
      where: { email },
    });

    if (!user || !passwordService.checkPassword(password, user.password)) {
      const err = new Error('Incorrect email or password');
      err.name = 'UnauthorizedError';
      throw err;
    }

    const withoutPassword: IUser = {
      id: user.id, email: user.email, username: user.username, role: user.role,
    };

    const token: string = JwtService.createToken(withoutPassword);
    return token;
  };
}
