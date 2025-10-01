import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { EpisodeService } from "../services/episodeService";

export class EpisodeController {
	public static createEpisode(req: Request, res: Response) {
		const { serieId, seasonId, episode } = req.body;
		if (!serieId || !seasonId || !episode) {
			return res.status(400).json({ error: "L'id de la serie, de l'eposde et de la saison sont requis" });
		}

		const dbFile = path.join(__dirname, "../data/db.json");
		const data = JSON.parse(fs.readFileSync(dbFile, "utf-8"));
		const serie = data.serie.find((s: any) => s.id === serieId);
		if (!serie) {
			return res.status(404).json({ error: "Serie introuvable" });
		}
		const season = (serie.season || []).find((sea: any) => sea.id === seasonId);
		if (!season) {
			return res.status(404).json({ error: "Saison introuvable" });
		}
		if (!season.episodes) season.episodes = [];
		season.episodes.push(episode);
		fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
		res.status(201).json(episode);
	}

    public static updateWatched(req: Request, res: Response) {
		const episodeId = req.params.id;
		const { watched } = req.body;

		if (typeof episodeId !== "string") {
			return res.status(400).json({ error: "L'identifiant de l'épisode est requis" });
		}

		if (typeof watched !== "boolean") {
			return res.status(400).json({ error: "Le champ 'watched' doit être un booléen" });
		} else {
			EpisodeService.markEpisodeWatched("s1", "sea1", episodeId);
			return res.status(200).json({ message: "Episode marqué comme vu" });
		}
    }

}
