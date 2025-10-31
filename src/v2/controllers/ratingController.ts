import { Request, Response, NextFunction } from "express";
import { RatingService } from "../services/ratingService";

export class RatingController {
    //------------ CRÉER UNE NOTE ------------//
    static async createRating(req: Request & { userId?: string }, res: Response, next: NextFunction) {
        try{
            const userId = (req as any).userId;
            const {target, targetId, score, review} = req.body;

            const rating = await RatingService.createRating(userId, {target, targetId, score, review});
             return res.status(201).json(rating);
        }catch(error){
            console.error("CREATE RATING ERROR:", error);
            return res.status(500).json({ error: "Erreur lors de la création de la note 😿" });
        }
    }

    //------------ MOYENNE DES NOTES D'UN FILM ------------//
    static async getMoviesAvgRating(req: Request<{ movieId: string }>, res: Response, next: NextFunction) {
        try{
            const moy = await RatingService.getMoviesAvgRating(req.params.movieId);
            return res.status(200).json(moy);
        }catch(error){
            return res.status(500).json({ error: "Erreur lors de la récupération de la moyenne des notes du film 😿" });
        }
    }

    //------------ MOYENNE DES NOTES SUR TOUS LES EPISODES D'UNE SÉRIE ------------//
    static async getSeriesAvgRating(req: Request<{ seriesId: string }>, res: Response, next: NextFunction) {
        try{
            const moy = await RatingService.getSeriesAvgRating(req.params.seriesId);
            return res.status(200).json(moy);
        }catch(error){
            return res.status(500).json({ error: "Erreur lors de la récupération de la moyenne des notes de la série 😿" });
        }
    }
}