import { NextFunction, Request, Response  } from "express";
import mongoose from "mongoose";
import { SeasonService } from "../services/seasonService";

export class SeasonController {
    //------------ GET TOUTES LES SAISONS D'UNE SERIE PAR ID DE SERIE ------------//
    static async getAllSeasonsBySeries(req: Request<{ seriesId: string }>, res: Response, next: NextFunction) {
        try {
            const {seriesId} = req.params;
            const objectId = new mongoose.Types.ObjectId(seriesId);
            const seasons = await SeasonService.getSeasonsBySerieId(objectId);

            if (!seasons || seasons.length === 0) {
                return res.status(200).json({ message: "Aucune saison trouvée pour cette série 😿" });
            }
            return res.status(200).json(seasons);
        }catch (error: any) {
            if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: "ID de série invalide 😿 " });
            }
            return res.status(404).json({ message: error.message });
        } 
    }

    //------------ CRÉER UNE SAISON ------------//
    static async createSeason(req: Request<{ seriesId: string }>, res: Response, next: NextFunction) {
        try {
            const { seriesId } = req.params;
            const { seasonNo, episodes } = req.body;

            //ajouter admin 
            const season = await SeasonService.createSeason(seriesId, { seasonNo, episodes });
            return res.status(201).json(season);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
}