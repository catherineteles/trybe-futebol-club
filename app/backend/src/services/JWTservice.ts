import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { IUser } from '../interfaces/ILogin';
import IJwtResponse from '../interfaces/IJwtResponse';

export default class JwtService {
  static createToken = (data: IUser): string => {
    const token = jwt.sign({ data }, process.env.JWT_SECRET as string);
    return token;
  };

  static validateToken = async (token: string): Promise<IUser> => {
    try {
      const { data } = await jwt.verify(token, process.env.JWT_SECRET as string) as IJwtResponse;
      return data;
    } catch (e) {
      const error = new Error('Expired or invalid token');
      error.name = 'UnauthorizedError';
      throw error;
    }
  };
}
