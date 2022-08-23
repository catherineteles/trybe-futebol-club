import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  constructor(private loginService: LoginService) { }

  async newLogin(req: Request, res: Response): Promise<void> {
    const token = await this.loginService.login(req.body);

    res.status(200).json({ token });
  }
}
