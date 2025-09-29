import { Episode } from "./episode.model";
import { Media } from "./media.model";
import { Season } from "./season.model";

export class Serie extends Media {
    status: "en_attente" | "en_cours" | "terminee";
    season: Season[];

    constructor(id: string,
        title: string,
        genre: string,
        year: number,
        rating: number,
        status: "en_attente" | "en_cours" | "terminee" = "en_attente",
        season: Season[] = []) {
        super(id, title, genre, year, rating);
        this.status = status;
        this.season = season;
    }

    //------------ MARQUER UN EPISODE COMME VU ------------//
    markEpisodeAsWatched(episodeId : string) : void {
        for (const season of this.season){
            const episode = season.episodes.find((e) => e.id === episodeId);
            if(episode){
                episode.watched = true;
                break;
            }
        }
    }

    getSummary(): string {
        return `${this.title} (${this.year}) - ${this.genre}, statut: ${this.status}`;
    }
}