import { Episode } from "./episode.model";

export class Season {
  id: string;
  serieId: string;
  seasonNumber: number;
  releaseDate: Date;
  episodes: Episode[];

  constructor(id: string, serieId: string, seasonNumber: number, releaseDate: Date, episodes: Episode[] = []) {
    this.id = id;
    this.serieId = serieId;
    this.seasonNumber = seasonNumber;
    this.releaseDate = releaseDate;
    this.episodes = episodes;
  }
}