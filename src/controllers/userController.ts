import { Request, Response } from "express";
import { readDB, writeDB } from "../services/dbService";

export class UserController {
    public async getAllUser(req : Request, res : Response){
        const db = await readDB();
        res.json(db.user);
    }

    public async getUserMedia(req : Request, res : Response){
        const db = await readDB();
        const {id} = req.params;
        if (!id) {
            return res.status(404).json({error : "Media or User not found"});
        }
        const userMedia = db.media.filter((m : any) => m.userId === id);
        res.json(userMedia);
    }
}