import {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";
import { EpisodeService } from "../services/episodeService";

export class EpisodeController {
	//------------ CRÉER UN ÉPISODE ------------//
	static async createEpisode(req: Request<{ seriesId: string; seasonId: string }>, res: Response, next: NextFunction) {
		try{
			const { seriesId, seasonId } = req.params;
			const { epNo, title, durationMin } = req.body;

			const episode = await EpisodeService.createEpisode(seriesId, seasonId, { epNo, title, durationMin });
            return res.status(201).json(episode);
		}catch (error : any) {
			return res.status(error).json({ message: error.message });
		}
	}

	//------------ LISTER TOUS LES EPISODES D'UNE SAISON ------------//
	static async getEpisodesBySeason(req: Request<{ seasonId: string }>, res: Response, next: NextFunction) {
		try {
			const episodes = await EpisodeService.getEpisodesBySeasonId(req.params.seasonId);

			if (!episodes || episodes.length === 0) {
				return res.status(200).json({ message: "Aucun épisode trouvé pour cette saison 😿" });
			}
			return res.status(200).json(episodes);
		}catch (error: any) {
			if (error instanceof mongoose.Error.CastError) {
							return res.status(400).json({ message: "ID de série invalide 😿 " });
						}
						return res.status(404).json({ message: error.message });
		}
	}
}