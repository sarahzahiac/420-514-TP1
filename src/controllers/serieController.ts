import { Request, Response } from "express";
import { SerieService } from "../services/serieService";
import { Serie } from "../models/serie.model";


export class FilmController {
    //------------ SEE ALL SERIE ------------//
    public static getAllSerie(req: Request, res: Response) {
        res.json(SerieService.getAllSerie);
    }

    //------------ GET A SERIE BY ID ------------//
    public static getById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Id parameter is required" });
        }

        const serie = SerieService.findById(id);
        if (!serie) { return res.status(404).json({ error: "Serie not found" }); }

        res.json(serie);
    }

    //------------ CREATE SERIE ------------//
    public static createSerie(req: Request, res: Response) {
    const {id, title, genre, year, rating, status } = req.body;
    const serie = new Serie(id, title, genre, year, rating, status, []);
    SerieService.addSerie(serie);
    res.status(201).json(serie);
    }

    //------------ DELETE SERIE ------------//
    public static deleteSerie(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Id parameter is required" });
        }

        SerieService.deleteSerie(id);
        res.status(204).send();
    }


}