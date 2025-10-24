import mongoose from "mongoose";
import { EpisodeModel} from "../models/episodeModel";
import { SeasonModel } from "../models/seasonModel";
import { SerieModel } from "../models/serieModel";        

export class EpisodeService {

  //------------ CREER UN EPISODE ------------//
  static async createEpisode(seriesId : string, seasonId : string, episodeData: { epNo: number; title: string; durationMin: number }) {
    const serie = await SerieModel.findById(seriesId);
    if (!serie) {
      throw new Error("Série introuvable 😿");
    }

    const season = await SeasonModel.findById(seasonId);
    if (!season) {
      throw new Error("Saison introuvable 😿");
    }

    const epExists = await EpisodeModel.findOne({ seriesId, seasonId, epNo: episodeData.epNo });
    if (epExists) {
      throw new Error("Le numéro d'épisode existe déjà pour cette saison 😿");
    }

    const episode = new EpisodeModel({
      seriesId,
      seasonId,
      epNo: episodeData.epNo,
      title: episodeData.title,
      durationMin: episodeData.durationMin
    });

    await episode.save();
    return episode;
  }

  //------------ LISTER LES EPISODES D'UNE SAISON ------------//
  static async getEpisodesBySeasonId(seasonId: string | mongoose.Types.ObjectId) {
    const query = mongoose.isValidObjectId(seasonId)
      ? { seasonId: new mongoose.Types.ObjectId(seasonId) }
      : { seasonId };
    return await EpisodeModel.find(query);
  }
}
