import { Request, Response } from "express";
import { SerieService } from "../services/serieService";

export class SerieController {
    //------------ GET TT LES SERIES AVEC FILTRES ------------//
    static async getSeries(req: Request, res: Response) {
        try {
            const series = await SerieService.getSeries(req.query);
            res.json(series);
        } catch (error) {
            res.status(500).json({ error: "Erreur lors du chargement des séries 😿" });
        }
    }

    //------------ CREER UNE SERIE ------------//
    static async createSerie(req: Request, res: Response) {
        try {
            const serie = await SerieService.createSerie(req.body);
            res.status(201).json(serie);
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la création de la série 😿" });
        }
    }
}
