import fs from "fs";
import path from "path";
import { Episode } from "../models/episode.model";
import { Serie } from "../models/serie.model";

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
  //------------ AJOUTER UN EPISODE ------------//
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

  //------------ MARQUER L'EPISODE COMME VUE ------------//
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

  public static updateWatched(
    episodeId: string,
    watched: boolean
  ): void {
    const data = loadDB();
    let found = false;
    for (const s of data.serie) {
      const serie = new Serie(
        s.id,
        s.title,
        s.genre,
        s.year,
        s.rating,
        s.status,
        s.season
      );
      serie.markEpisodeAsWatched(episodeId, watched);
      s.season = serie.season;
      for (const season of serie.season) {
        if ((season.episodes || []).some((ep: any) => ep.id === episodeId && ep.watched === watched)) {
          found = true;
          break;
        }
      }
      if (found) break;
    }
    if (!found) throw new Error("Episode not found");
    saveDB(data);
  }
}