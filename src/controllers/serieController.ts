import { Request, Response } from "express";
import { SerieService } from "../services/serieService";
import { Serie } from "../models/serie.model";


export class SerieController {
    //------------ GET TT LES SÉRIE ------------//
    public static getAllSerie(req: Request, res: Response) {
        res.json(SerieService.getAllSerie);
    }

    //------------ GET UNE SÉRIE PAR ID ------------//
    public static getById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Un paramètre ID est obligatoire" });
        }

        const serie = SerieService.findById(id);
        if (!serie) { return res.status(404).json({ error: "Série introuvable" }); }

        res.json(serie);
    }

    //------------ CRÉER UNE SÉRIE ------------//
    public static createSerie(req: Request, res: Response) {
    const {id, title, genre, year, rating, status } = req.body;
    const serie = new Serie(id, title, genre, year, rating, status, []);
    SerieService.addSerie(serie);
    res.status(201).json(serie);
    }

    //------------ SUPPRIMER UNE SÉRIE ------------//
    public static deleteSerie(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Un paramètre ID est obligatoire" });
        }

        SerieService.deleteSerie(id);
        res.status(204).send();
    }


}