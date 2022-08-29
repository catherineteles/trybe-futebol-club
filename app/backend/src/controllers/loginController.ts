import { NextFunction, Request, Response } from 'express';
import validateBody from '../services/validateLogin';
import LoginService from '../services/loginService';
import JwtService from '../services/JWTservice';

export default class LoginController {
  static newLogin = async (req: Request, res: Response): Promise<void> => {
    await validateBody(req.body);
    const { email, password } = req.body;
    const token = await LoginService.login(email, password);

    res.status(200).json({ token });
  };

  static validateLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { authorization } = req.headers;
    const { role } = await JwtService.validateToken(authorization as string);

    res.status(200).json({ role });
    next();
  };

  // static validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   const { authorization } = req.headers;
  //   await JwtService.validateToken(authorization as string);

  //   next();
  // };
}
