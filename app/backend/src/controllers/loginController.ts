import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  static newLogin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const token = await LoginService.login(email, password);

    res.status(200).json({ token });
  };
}
