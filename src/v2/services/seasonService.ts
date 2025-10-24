import mongoose from "mongoose";
import { SeasonModel } from "../models/seasonModel";
import { SerieModel } from "../models/serieModel";

export class SeasonService {
    //------------ GET TT LES SAISONS D'UNE SERIE ------------//
    static async getSeasonsBySerieId(seriesId: string | mongoose.Types.ObjectId) {
        const query = mongoose.isValidObjectId(seriesId)
            ? { seriesId: new mongoose.Types.ObjectId(seriesId) }
            : { seriesId };
        return await SeasonModel.find(query);
    }


    //------------ CRÉER UNE SAISON ------------//
    static async createSeason(seriesId: string, seasonData: { seasonNo: number; episodes: number }) {
        const serie = await SerieModel.findById(seriesId);
        if (!serie) {
            throw new Error("Série introuvable 😿");
        }

        const existing = await SeasonModel.findOne({seriesId, seasonNo: seasonData.seasonNo});
        if (existing) {
            throw new Error("La saison existe déjà pour cette série 😿");
        }

        const season = new SeasonModel({seriesId, seasonNo: seasonData.seasonNo, episodes: seasonData.episodes});
        await season.save();
        return season;
    }
}

export default SeasonService;