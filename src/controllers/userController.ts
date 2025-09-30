import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { logError } from "../services/logger";
import { error } from "console";

export class UserController {
    public getAllUser(_req : Request, res : Response){
        try{
            res.json(UserService.getAllUsers());
        } catch(e:any){
            logError(e, "GET", "api/users");
            res.status(500).json({error : "Erreur de serveur"});
        }
    }

    public getUserMedia(req : Request, res : Response){
        try{
            const {id} = req.params;
            if (!id) return res.status(400).json({error : "Parametre Id est obligatoire"});
            const user = UserService.findById(id);
            if (!user) return res.status(404).json({erro : "Utilisateur introuvable"});
            const medias = UserService.getUserMedias(id);
            res.json(medias);
        } catch (e :any){
            logError(e, req.method, req.originalUrl);
            res.status(500).json({error : "Erreur de serveur"});
        }
    }
}