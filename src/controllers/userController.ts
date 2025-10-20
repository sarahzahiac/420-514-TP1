import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userService";
import c from "config";

export class UserController {

    //------------ GET MON PROFIL ------------//
    static async getMe(req: Request & { userId?: string }, res: Response, next: NextFunction) {
        try {
            const user = await UserService.getMe(req.userId!);
            return res.status(200).json(user);
        }catch (error: any) {
            return res.status(500).json({ message: error });
        }
    }

    //------------ METTRE À JOUR MON PROFIL ------------//
    static async updateMe(req: Request & { userId?: string }, res: Response, next: NextFunction) {
        try {
            const user = await UserService.updateMe(req.userId!, req.body);
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    }

    //------------ GET USER PAR ID ------------//
    static async getUserById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    }
}