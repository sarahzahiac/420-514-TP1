import { Request, Response } from "express";
import { readDB, writeDB } from "../services/dbService";
import { write } from "node:fs";


export class SerieController {

    //------------ VOIT TT LES SERIES ------------//
    public async getAllSerie (req : Request, res : Response){
        const db = await readDB();
        res.json(db.serie);
    }

    //------------ VOIR UNE SERIE PAR ID ------------//
    public async getSerieById (req : Request, res : Response){
        const {id} = req.params;
        if (!id) {
            return res.status(404).json({error : "No serie ID"});
        }
        const db = await readDB();

        const serie = db.serie.find((s : any) => s.id === id);
        if(!serie) return res.status(404).json({error : "Serie not found"})
        
        res.json(serie);
    }

    //------------ CREER UNE SERIE ------------//
    public async createSerie(req : Request, res : Response){
        const db = await readDB();
        const newSerie = {...req.body};
        db.serie.push(newSerie);
        await writeDB(db);
        res.status(201).json(newSerie);
    }

    //------------ MODIFIER UNE SERIE ------------//
    public async updateMedia(req : Request, res : Response){
        const db = await readDB();
        const {id} = req.params;
        if (!id) {
            return res.status(404).json({error : "No serie ID"});
        }
        const index = db.media.findIndex((m : any) => m.id === id);

        db.media[index] = {...db.media[index], ...req.body};
        await writeDB(db);

        res.json(db.media[index]);
    }

        //------------ SUPPRIMER UNE SERIE ------------//
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