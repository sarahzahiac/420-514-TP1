import { Request, Response } from "express";
import { FilmService } from "../services/filmService";
import { Film } from "../models/film.model";


export class FilmController {
    //------------ SEE ALL FILM ------------//
    public static getAllFilm(req: Request, res: Response) {
        res.json(FilmService.getAllFilm);
    }

    //------------ GET A FILM BY ID ------------//
    public static getById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Id parameter is required" });
        }

        const film = FilmService.findById(id);
        if (!film) { return res.status(404).json({ error: "Film not found" }); }

        res.json(film);
    }

    //------------ CREATE FILM ------------//
    public static createFilm(req: Request, res: Response) {
    const { id, title, genre, year, rating, duration, watched } = req.body;
    const film = new Film(id, title, genre, year, rating, duration, watched);
    FilmService.addFilm(film);
    res.status(201).json(film);
    }

    //------------ DELETE FILM ------------//
    public static deleteFilm(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Id parameter is required" });
        }

        FilmService.deleteFilm(id);
        res.status(204).send();
    }


}