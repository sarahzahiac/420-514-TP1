import { Request, Response } from "express";
import { MovieService } from "../services/movieService";

export class MovieController {

    //------------ GET TT LES MOVIES ------------//
    static async getAllMovies(req: Request, res: Response) {
        try {
            const movies = await MovieService.getAllMovies();
            res.json(movies);
        } catch (error) {
            res.status(500).json({ error: "Erreur lors du chargement des films 😿" });
        }
    }

    //------------ GET UN MOVIE PAR ID ------------//
    static async getMovieById(req: Request<{ id: string }>, res: Response) {
        try {            
            const movies = await MovieService.getMovieById(req.params.id);
            if (!movies) {
                return res.status(404).json({ error: "Film introuvable 😿" });
            }
            res.json(movies);
        }catch (error) {
            res.status(500).json({ error: "Erreur lors du chargement du film 😿" });
        }
    }

    //------------ CRÉER UN MOVIE ------------//
    static async createMovie(req: Request, res: Response) {
        try {
            const movie = await MovieService.createMovie(req.body);
            res.status(201).json(movie);
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la création du film 😿" });
        }
    }

    //------------ UPDATE UN MOVIE PAR ID ------------//
    static async updateMovie(req: Request<{ id: string }>, res: Response) {
        try {
            const movie = await MovieService.updateMovie(req.params.id, req.body);
            if (!movie) {
                return res.status(404).json({ error: "Film introuvable 😿" });
            }
            res.json(movie);
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la mise à jour du film 😿" });
        }
    }

    //------------ SUPPRIMER UN MOVIE PAR ID ------------//
    static async deleteMovie(req: Request<{ id: string }>, res: Response) {
        try {
            const movie = await MovieService.deleteMovie(req.params.id);
            if (!movie) {
                return res.status(404).json({ error: "Film introuvable 😿" });
            }
            res.json({ message: `Le film "${movie.title}" a été supprimé avec succès 😺` });
        } catch {
            res.status(500).json({ error: "Erreur lors de la suppression du film 😿" });
        }
    }
}