import {Episode} from "./episode.model";

export class Season{
  seasonNumber: number;
  releaseDate: Date;
  episodes: Episode[];

  constructor(seasonNumber: number, releaseDate: Date, episodes: Episode[] = []) {
    this.seasonNumber = seasonNumber;
    this.releaseDate = releaseDate;
    this.episodes = episodes;
  }
}