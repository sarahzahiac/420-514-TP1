import { Request, Response } from "express";
import { FilmService } from "../services/filmService";
import { Film } from "../models/film.model";


export class FilmController {
    //------------ GET TT LES FILM ------------//
    public static getAllFilm(req: Request, res: Response) {
        res.json(FilmService.getAllFilm);
    }

    //------------ GET UN FILM PAR ID ------------//
    public static getById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Un paramètre ID est obligatoire" });
        }

        const film = FilmService.findById(id);
        if (!film) { return res.status(404).json({ error: "Film introuvable" }); }

        res.json(film);
    }

    //------------ CRÉER UN FILM ------------//
    public static createFilm(req: Request, res: Response) {
    const { id, title, genre, year, rating, duration, watched } = req.body;
    const film = new Film(
        id,
        title, 
        genre, 
        year, 
        rating, 
        duration, 
        watched);
    FilmService.addFilm(film);
    res.status(201).json(film);
    }

    //------------ SUPPRIMER UN FILM ------------//
    public static deleteFilm(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Un paramètre ID est obligatoire" });
        }

        FilmService.deleteFilm(id);
        res.status(204).send();
    }


}