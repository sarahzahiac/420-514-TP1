import { Request, Response } from "express";
import { readDB, writeDB } from "../services/dbService";


export class MediaController {

    //------------ VOIT TT LES MEDIAS ------------//
    public async getAllMedia (req : Request, res : Response){
        const db = await readDB();
        res.json(db.media);
    }

    //------------ VOIR UN MEDIA PAR ID ------------//
    public async getMediaById (req : Request, res : Response){
        const db = await readDB();
        const {id} = req.params;
        if (!id) {
            return res.status(404).json({error : "Media not found"});
        }
        const media = db.media.find((m : any) => m.id === id);
        
        res.json(media);
    }

    //------------ CREER UN MEDIA ------------//
    public async createMedia(req : Request, res : Response){
        const db = await readDB();
        const {id} = req.params;
        //Gestion d'erreur utilisateur
        if(!id){
            return res.status(404).json({error : "Id is not valid"});
        }

        const exists = db.media.some((m : any) => m.id === id);
        if (exists) {
            return res.status(404).json({error : "ID exists already"});
        }

        const newMedia = {...req.body};
        db.media.push(newMedia);
        await writeDB(db);
        res.status(201).json(newMedia);
    }

    //------------ MODIFIER UN MEDIA ------------//
    public async updateMedia(req : Request, res : Response){
        const db = await readDB();
        const {id} = req.params;
        if (!id) {
            return res.status(404).json({error : "Media not found"});
        }
        const index = db.media.findIndex((m : any) => m.id === id);

        db.media[index] = {...db.media[index], ...req.body};
        await writeDB(db);

        res.json(db.media[index]);
    }

        //------------ SUPPRIMER UN MEDIA ------------//
    public async deletmedia(req : Request, res : Response){
        const db = await readDB();
        const {id} = req.params;
        if (!id) {
            return res.status(404).json({error : "Media not found"});
        }
        const index = db.media.filter((m : any) => m.id === id);

        await writeDB(db);
        res.status(204).send();
    }
}