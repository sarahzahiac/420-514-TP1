import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";

export class AuthController {

  //------------ REGISTER ------------//
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, nom, username, password } = req.body;
      const user = await AuthService.register({ email, nom, username, password });
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  //------------ LOGIN ------------//
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}
