import { Episode } from "./episode.model";
import { Media } from "./media.model";
import { Season } from "./season.model";

export class Serie extends Media {
    status: "En cours" | "Terminée";
    saisons: Season[];

    constructor(id: string,
        title: string,
        genre: string,
        year: number,
        rating: number,
        status: "En cours" | "Terminée" = "En cours",
        saisons: Season[] = []) {
        super(id, title, genre, year, rating);
        this.status = status;
        this.saisons = saisons;
    }

    //------------ MARQUER UN EPISODE COMME VU ------------//

    getSummary(): string {
        return `${this.title} (${this.year}) - ${this.genre}, statut: ${this.status}`;
    }
}