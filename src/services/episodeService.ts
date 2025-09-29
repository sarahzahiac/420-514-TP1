import fs from "fs";
import path from "path";
import { Episode } from "../models/episode.model";

//------------ CHARGEMENT DE JSON ------------//
const dbFile = path.join(__dirname, "../data/db.json");

function loadDB() {
    if (!fs.existsSync(dbFile)) {
        return { film: [], serie: [] };
    }
    const raw = fs.readFileSync(dbFile, "utf-8");
    return JSON.parse(raw);
}

function saveDB(data: any) {
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2))
}

export class EpisodeService {
  public static addEpisode(
    serieId: string,
    seasonId: string,
    episode: Episode
  ): void {
    const data = loadDB();
    const serie = data.serie.find((s: any) => s.id === serieId);
    if (!serie) throw new Error("Serie not found");

    const season = serie.saisons.find((se: any) => se.id === seasonId);
    if (!season) throw new Error("Season not found");

    season.episodes = season.episodes || [];
    season.episodes.push({
      id: episode.id,
      title: episode.title,
      duration: episode.duration,
      watched: episode.watched,
    });

    saveDB(data);
  }

  public static markEpisodeWatched(
    serieId: string,
    seasonId: string,
    episodeId: string
  ): void {
    const data = loadDB();
    const serie = data.serie.find((s: any) => s.id === serieId);
    if (!serie) throw new Error("Serie not found");

    const season = serie.saisons.find((se: any) => se.id === seasonId);
    if (!season) throw new Error("Season not found");

    const episode = season.episodes.find((ep: any) => ep.id === episodeId);
    if (!episode) throw new Error("Episode not found");

    episode.watched = true;
    saveDB(data);
  }
}